const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const reacciones = {};

//obtener reaaciones segun pub
reacciones.getreacciones = async (req, res) => {
    const id = req.params.id_pub;
    res.status(200).json(response.rows);
}
//obtener reaccion segun usuario
reacciones.getreaccion = async (req, res) => {
    const {id_u}=req.body ;
    const id_p = req.params.id_pub;
    const response = await conexion.query(`SELECT * FROM cant_reac WHERE usuario.id_usuario=${id_u} and publicacion.id_pub = ${id_p}`);
    res.status(200).json(response.rows);
}
///ingresar reaccion
reacciones.registro = async(req, res) => {
    const {id_reac,id_usuario,id_pub } = req.body;
    let query = `INSERT INTO public.cant_reac VALUES ('${id_pub}','${id_usuario}','${id_reac}')`;
    await conexion.query(query);
    //const result = await conexion.query("SELECT  MAX(id_usuario) FROM cant_reac LIMIT 1");
    //const id = result.rows[0].max;
    //const response = await conexion.query(``);
    //res.status(200).json(response.rows);
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