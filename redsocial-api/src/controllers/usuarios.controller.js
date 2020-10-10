const conexion = require('./conexionDB')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'rd**'
const usuarios = {};
usuarios.getusuarios = async (req, res) => {
    const response = await conexion.query("select *from usuario");
    res.status(200).json(response.rows);
}
usuarios.registro = async(req, res) => {
    const {nombres_user,apellidos_user,fecha_nac,email_user,contrasena_usuario,presentacion,telefono,id_genero } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contrasena_usuario, salt);
    let query = `INSERT INTO public.usuario(nombres_usuario, apellidos_usuario, fecha_nac_usuario, email_usuario, contrasena_usuario, presentacion_usuario, telefono_usuario, id_genero) VALUES ('${nombres_user}','${apellidos_user}','${fecha_nac}','${email_user}','${hash}','${presentacion}','${telefono}','${id_genero}')`;
    await conexion.query(query);
    const response = await conexion.query("select *from usuario");
    const token = jwt.sign({ _id: response.rows[0].id_user }, SECRET_KEY)

    res.status(200).json({ token })
}
//Actualiza datos de Usuario mediante id
usuarios.update = async (req, res) => {
    const id = req.params.id_usuario;
    const {nombres_user,apellidos_user,fecha_nac,email_user,presentacion,telefono,id_genero } = req.body;
    let query = `UPDATE usuario SET nombres_usuario='${nombres_user}', apellidos_usuario='${apellidos_user}', fecha_nac_usuario='${fecha_nac}', email_usuario='${email_user}',presentacion_usuario='${presentacion}', telefono_usuario='${telefono}', id_genero='${id_genero}' WHERE id_usuario = ${id}`;
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
usuarios.loginUser = async (req, res) => {
    console.log('Yo me encargo de esto')
    const { email_user, contrasena_usuario } = req.body;
    let query = `SELECT * FROM usuario where email_usuario = '${email_user}'`;
    const user = await conexion.query(query);
    if (user.rows == 0) return res.status(401).json({ message: "Usuario no registrado" });
    if (!bcrypt.compareSync(contrasena_usuario, user.rows[0].contrasena_usuario)) return res.status(401).json({ message: "Password erroneo" })
   const token = jwt.sign({ _id: user.rows[0].id_usuario},SECRET_KEY);
    res.status(200).json({ token })
	
}
usuarios.authUsuario= async(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    const id = payload._id;
    const response = await conexion.query('select *from usuario WHERE id_usuario =$1', [id]);
	res.status(200).json(response.rows);
}

module.exports = usuarios;
