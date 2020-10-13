//Importamos passport asi como la libreria de estrategia local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Importamos el Controlador del Usuario, ya que se ocuparán algunas de sus funciones
const UsuarioController = require('../controllers/usuarios.controller')

//Importación de la conexIón a la db
const conexion_pg = require('../controllers/conexionDB');
const validaciones = require('../validaciones');

//ESTRATEGIA DE AUTENTICACION LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'email_user',
    passwordField: 'contrasena_usuario'
}, async (email_user, contrasena_usuario, done) => {
    console.log('este es el correo: ' + email_user)
    var values = [email_user]
    const resultado = await conexion_pg.query("SELECT id_usuario, email_usuario FROM usuario where email_usuario = $1;", values);
    UsuarioEncontrado = resultado.rows[0]
    console.log(resultado.rows[0])
        //Si el usuario no exite se termina la función
    if (!UsuarioEncontrado) {
        console.log('Usuario no encontrado')
        return done(null, false, { message: 'Usuario no encontrado' })
    } else {//Caso contrario se verificará la contraseña
        console.log("Usuario si encontrado")
        const password_in_session = await conexion_pg.query("SELECT contrasena_usuario FROM usuario where email_usuario = $1 ", [email_user]) //Buscamos la contraseña del usuario ingresado
        console.log('este es la password: ' + password_in_session.rows[0].contrasena_usuario)
        const passValidate = validaciones.CompararPassword(contrasena_usuario, password_in_session.rows[0].contrasena_usuario) //Comparamos la contraseña de la BD con la ingresada
        //Si las contraseñas coinciden guarda al usuario en la sesion
        if (passValidate) {
            console.log("La contraseña SI coinciden ")
            return done(null, UsuarioEncontrado)
        } else {
            console.log("La contraseña NO coinciden ")
            return done(null, false, { message: 'La contraseña es incorrecta' })
        }
    }
}));

//Agrega al usuario a la sesion de passport para evitar el logeo en cada pagina
passport.serializeUser((user, done) => {
    console.log("ID Usuario Serializado: " + user.id_usuario)
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
    var DatosUsuarioEnSesion = ''
    //Este metodo ha sido moficado para poder trabajar con postgresql y sequelize, siguiendo el metodo de la documentacion de passport
    //Buscamos el Usuario en la base de datos por medio del id que se habia almacenado en la session de passport
    const UsuarioEnSesion = await conexion_pg.query("SELECT * FROM usuario where id_usuario = $1;", [id])
    console.log(UsuarioEnSesion)
    //Si existe el usuario
    if (UsuarioEnSesion) {
        DatosUsuarioEnSesion = {
            id_usuario: UsuarioEnSesion.rows[0].id_usuario,
            usuario: UsuarioEnSesion.rows[0].email_usuario,
        }
        console.log(DatosUsuarioEnSesion)
        done(null, DatosUsuarioEnSesion) //Esta funcion se encarga de agg nuestro usuario al req.user (metodo propio de passport)al 
    }
});

