const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const publicaciones = {};


publicaciones.getpublicaciones = async (req, res) => {
    const response = await conexion.query("SELECT * FROM publicacion INNER JOIN usuario on publicacion.id_usuario = usuario.id_usuario  order by publicacion.id_pub DESC");
    res.status(200).json(response.rows);
}

publicaciones.getpublicacion = async (req, res) => {
    const id = req.params.id_pub;
    const response = await conexion.query(`SELECT * FROM publicacion INNER JOIN usuario on publicacion.id_usuario = usuario.id_usuario   where id_pub = ${id} order by publicacion.id_pub DESC`);
    res.status(200).json(response.rows);
}

publicaciones.registro = async(req, res) => {
    const {fecha_bub,url,id_usuario,id_type } = req.body;
    const urli = `${url}/publicaciones/${req.file.filename}`;
    let query = `INSERT INTO public.publicacion( contenido_pub, fecha_bub, id_usuario, id_type) VALUES ('${urli}','${fecha_bub}','${id_usuario}','${id_type}')`;
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_pub) FROM publicacion LIMIT 1");
    const id = result.rows[0].max;
    const response = await conexion.query(`SELECT * FROM publicacion INNER JOIN usuario on publicacion.id_usuario = usuario.id_usuario where id_pub = ${id}`);
    res.status(200).json(response.rows);
}
module.exports = publicaciones;