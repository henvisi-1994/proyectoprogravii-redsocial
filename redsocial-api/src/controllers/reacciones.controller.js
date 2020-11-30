const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const reacciones = {};

//obtener reaaciones segun pub
reacciones.getreacciones = async (req, res) => {
    const response = await conexion.query("SELECT * FROM publicacion INNER JOIN cant_reac on cant_reac.id_pub = publicacion.id_pub  order by publicacion.id_pub DESC");
    res.status(200).json(response.rows);
}
//obtener reaccion segun usuario
reacciones.getreaccion = async (req, res) => {
    const id_p = req.params.id_pub;
    const response = await conexion.query(`SELECT * from cant_reac,publicacion where cant_reac.id_pub = publicacion.id_pub and cant_reac.id_pub = ${id_p}`);
    res.status(200).json(response.rows);
}
///ingresar reaccion
reacciones.registro = async(req, res) => {
    const {id_reac,id_usuario,id_pub } = req.body;
    let query = `INSERT INTO public.cant_reac(id_pub,id_usuario,id_reac) VALUES ('${id_pub}','${id_usuario}','${id_reac}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_cant_reac) FROM cant_reac LIMIT 1");
    const id = result.rows[0].max;
    const response = await conexion.query(`select * from view_get_reaccion where id_cant_reac=${id}`);
    res.status(200).json(response.rows);
}
//actualizar reacion
reacciones.actualizar = async(req, res) => {
    const {id_reac,id_usuario,id_pub } = req.body;
    let query = `UPDATE public.cant_reac SET id_reac='${id_reac}'where id_pub='${id_pub}'and id_usuario='${id_usuario}'`;
    await conexion.query(query);
}
//borrar reaccion
reacciones.borrar = async(req, res) => {
    const {id_usuario,id_pub } = req.body;
    let query = `DELETE FROM public.cant_reac where id_pub='${id_pub}'and id_usuario='${id_usuario}'`;
    await conexion.query(query);
}
module.exports = reacciones;