const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const notificaciones = {};


notificaciones.getnotificaciones = async (req, res) => {
    const response = await conexion.query("	SELECT * FROM notif_detalle INNER JOIN usuario on notif_detalle.id_usuario = usuario.id_usuario INNER JOIN notificaciones on notif_detalle.id_notif=notificaciones.id_notif order by notificaciones.id_notif DESC");
    res.status(200).json(response.rows);
}

notificaciones.getnotificacion = async (req, res) => {
    const id = req.params.id_notif;
    const response = await conexion.query(`	SELECT * FROM notif_detalle INNER JOIN usuario on notif_detalle.id_usuario = usuario.id_usuario INNER JOIN notificaciones on notif_detalle.id_notif=notificaciones.id_notif  where notif_detalle.id_notif = ${id} order by notificaciones.id_notif DESC`);
    res.status(200).json(response.rows);
}

notificaciones.registro = async(req, res) => {
    const {contenido_notif,fecha_hora_notif,leida_notif,id_usuario } = req.body;
    let query = `INSERT INTO public.notificaciones(contenido_notif,fecha_hora_notif, leida_notif) VALUES ('${contenido_notif}','${fecha_hora_notif}','${leida_notif}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_notif) FROM notificaciones LIMIT 1");
    const id_notif = result.rows[0].max;
    let query1 = `INSERT INTO public.notif_detalle(id_notif, id_usuario) VALUES ('${id_notif}','${id_usuario}')`;
    await conexion.query(query1);
    const response = await conexion.query(`SELECT * FROM notif_detalle INNER JOIN usuario on notif_detalle.id_usuario = usuario.id_usuario INNER JOIN notificaciones on notif_detalle.id_notif=notificaciones.id_notif  where notif_detalle.id_notif = ${id_notif} order by notificaciones.id_notif DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de notificacion mediante id
notificaciones.update = async (req, res) => {
    const id = req.params.id_notif;
    const {contenido_notif,fecha_hora_notif, leida_notif} = req.body;
    let query = `UPDATE notificaciones SET contenido_notif='${contenido_notif}', fecha_hora_notif='${fecha_hora_notif}', leida_notif='${leida_notif}' WHERE id_notif = ${id}`;
    await conexion.query(query);
    res.json('Notificacion Actualizado con exito');
}
//Elimina datos de usuario notificacion id
notificaciones.delete = async (req, res) => {
    const id = req.params.id_notif;
    await conexion.query('DELETE FROM notif_detalle WHERE id_notif =$1', [id]);
    const response = await conexion.query('DELETE FROM notificaciones WHERE id_notif =$1', [id]);
    res.json(`Notificacion ${id} Eliminado Satisfactoriamente`) 
}
module.exports = notificaciones;