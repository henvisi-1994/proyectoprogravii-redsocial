const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsuarioController = require('../controllers/usuarios.controller')

const conexion_pg = require('../controllers/conexionDB');
const validaciones = require('../validaciones');

// Autenticación local
passport.use('local-login', new LocalStrategy({
    usernameField: 'email_user',
    passwordField: 'contrasena_usuario'
}, async (email_user, contrasena_usuario, done) => {
    var values = [email_user]
    const resultado = await conexion_pg.query("SELECT id_usuario, email_usuario FROM usuario where email_usuario = $1;", values);
    UsuarioEncontrado = resultado.rows[0]
    if (!UsuarioEncontrado) {
        return done(null, false, { message: 'Usuario no encontrado' })
    } else { // Verificacion de password
        console.log("Usuario si encontrado")
        const password_in_session = await conexion_pg.query("SELECT contrasena_usuario FROM usuario where email_usuario = $1 ", [email_user])
        const passValidate = validaciones.CompararPassword(contrasena_usuario, password_in_session.rows[0].contrasena_usuario)
        if (passValidate) {
            return done(null, UsuarioEncontrado)
        } else {
            return done(null, false, { message: 'La contraseña es incorrecta' })
        }
    }
}));

passport.serializeUser((user, done) => {
    console.log("ID Usuario Serializado: " + user.id_usuario)
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
    var DatosUsuarioEnSesion = ''
    const UsuarioEnSesion = await conexion_pg.query("SELECT * FROM usuario where id_usuario = $1;", [id])
    console.log(UsuarioEnSesion)
    if (UsuarioEnSesion) {
        DatosUsuarioEnSesion = {
            id_usuario: UsuarioEnSesion.rows[0].id_usuario,
            usuario: UsuarioEnSesion.rows[0].email_usuario,
        }
        console.log(DatosUsuarioEnSesion)
        done(null, DatosUsuarioEnSesion)
    }
});

