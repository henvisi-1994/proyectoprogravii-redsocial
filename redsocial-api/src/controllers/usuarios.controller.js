const conexion = require('./conexionDB')
const passport = require('passport');//Controla la autentificacion de los usuarios
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'rd**'
const usuarios = {};

usuarios.getusuarios = async (req, res) => {
    const response = await conexion.query("select *from usuario");
    res.status(200).json(response.rows);
}
usuarios.getusuario = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`select *from usuario where id_usuario = ${id}`);
    res.status(200).json(response.rows);
}
usuarios.registro = async(req, res) => {
    const {nombres_user,apellidos_user,fecha_nac,email_user,contrasena_usuario,presentacion,telefono,id_genero,nom_usuario } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contrasena_usuario, salt);
    let email = `SELECT * FROM public.usuario WHERE email_usuario = '${email_user}'`
    const existente = await conexion.query(email);
    emailExistente = existente.rows[0]
    if (emailExistente) {
        return res.status(400).send('El correo ingresado esta actualmente en uso.')
    }else{
        let query = `INSERT INTO public.usuario(nombres_usuario, apellidos_usuario, fecha_nac_usuario, email_usuario, contrasena_usuario, presentacion_usuario, telefono_usuario, id_genero,nom_usuario) VALUES ('${nombres_user}','${apellidos_user}','${fecha_nac}','${email_user}','${hash}','${presentacion}','${telefono}','${id_genero}','${nom_usuario}')`;
        await conexion.query(query);
        const result = await conexion.query("SELECT  MAX(id_usuario) FROM usuario LIMIT 1");
        const token = jwt.sign({ _id: result.rows[0].max }, SECRET_KEY)
    
        res.status(200).json({ token })
    }   
}

//Actualiza datos de Usuario mediante id
usuarios.update = async (req, res) => {
    const id = req.params.id_usuario;
    const {nombres_user,apellidos_user,fecha_nac,email_user,presentacion,telefono,id_genero,nom_usuario } = req.body;
    let query = `UPDATE usuario SET nombres_usuario='${nombres_user}', apellidos_usuario='${apellidos_user}', fecha_nac_usuario='${fecha_nac}', email_usuario='${email_user}',presentacion_usuario='${presentacion}', telefono_usuario='${telefono}', id_genero='${id_genero}', nom_usuario= ${nom_usuario} WHERE id_usuario = ${id}`;
    await conexion.query(query);
    res.json('Usuario Actualizado con exito');
}

usuarios.updateContrasena = async(req, res) => {
    let salt = bcrypt.genSaltSync(10);
    const id = req.params.id_usuario;
    const{contrasena_user} = req.body;
    let hash = bcrypt.hashSync(contrasena_user, salt);
    let query = `UPDATE usuario SET contrasena_usuario = '${hash}'WHERE id_usuario = ${id}`;
    await conexion.query(query);
    res.json('Contraseña Actualizada con exito');
}
//Actualiza datos de Usuario mediante id
usuarios.updateImagen = async (req, res) => {
    const id = req.params.id_usuario;
    const{url} = req.body;
    const urli = `${url}/usuarios/${req.file.filename}`;
     let query = `UPDATE usuario SET imagen_usuario = '${urli}' WHERE id_usuario = ${id}`;
     console.log(query);
    await conexion.query(query);
    res.json('Usuario Actualizado con exito');
}
usuarios.confirmContrasena = async(req,res) => {
    const id = req.params.id_usuario;
    const{contrasena_usuario} = req.body;
    let query = `SELECT * FROM usuario where id_usuario = '${id}'`;
    const user = await conexion.query(query);
    if (user.rows == 0) return res.status(401).json({ message: "Usuario no registrado" });
    if (!bcrypt.compareSync(contrasena_usuario, user.rows[0].contrasena_usuario)) return res.status(401).json({ message: "Password erroneo" })
    res.json('Contraseña Correcta');
}

//Elimina datos de usuario mediante id
usuarios.delete = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query('DELETE FROM usuario WHERE id_usuario =$1', [id]);
    res.json(`usuario ${id} Eliminado Satisfactoriamente`)
}

// Login de ususario con sesiones de Redis
usuarios.loginUser = async (req, res, next) => {
    console.log('ID Session User: ' + req.sessionID);
    passport.authenticate('local-login', (err, usuario, info) => {
        try {
            if (err) {
                next(('Esto es un error: ' + err));
            }
            if (!usuario) {
                return res.status(400).send('Usuario o Contraseña no válidos')
            }
            req.logIn(usuario, (err) => {
                if (err) {
                    next(err);
                }
                const token = jwt.sign({_id: usuario.id_usuario}, SECRET_KEY);
                req.session.id_usuario = usuario.id_usuario
                user = req.user;
                res.json({ user, token })
            })
        } catch (error) {
            console.log("Este es el error: " + error)
        }
    })(req, res);
};

// Cierre de sesión y destruccion de la cookie
usuarios.Logout = async (req, res) => {
    res.clearCookie('sessionID')
    req.session.destroy(err => {
        if (err) {
            console.log('Ha ocurrido un error')
        }
    })
    req.logout();
    console.log('ID Session User TERMINADA: ' + req.sessionID)
    res.status(200).json('Sesion Terminada');
}

usuarios.authUsuario= async(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    const id = payload._id;
    const response = await conexion.query('select usuario.id_usuario, nombres_usuario,apellidos_usuario,fecha_nac_usuario,email_usuario,presentacion_usuario,telefono_usuario,nom_usuario,imagen_usuario,usuario.id_genero,nombre_genero from usuario INNER JOIN genero ON usuario.id_genero=genero.id_genero WHERE id_usuario = $1', [id]);
	res.status(200).json(response.rows);
}

module.exports = usuarios;
