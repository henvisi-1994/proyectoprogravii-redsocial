const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const marketplace = {};

marketplace.getmarketplaces = async (req, res) => {
    const response = await conexion.query(`select mark_place.contenido_mark,mark_place.id_mark,mark_place.lugar_mark,usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario
    from mark_place inner join usuario on mark_place.id_usuario=usuario.id_usuario  ORDER by mark_place.id_mark DESC`);
    res.status(200).json(response.rows);
}
marketplace.registro = async (req, res) => {
    const {contenido_mark,lugar_mark,id_usuario} = req.body;
    let query = `INSERT INTO public.mark_place(contenido_mark, lugar_mark, id_usuario) VALUES ('${contenido_mark}','${lugar_mark}','${id_usuario}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_mark) FROM mark_place LIMIT 1");
    const id_mark = result.rows[0].max;
    const response = await conexion.query(`select mark_place.contenido_mark,mark_place.id_mark,mark_place.lugar_mark,usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario
    from mark_place inner join usuario on mark_place.id_usuario=usuario.id_usuario  where mark_place.id_mark  = ${id_mark} order by mark_place.id_mark DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de eventos mediante id
marketplace.update = async (req, res) => {
    const id = req.params.id_mark;
    const {contenido_mark,lugar_mark,id_usuario} = req.body;
    let query = `UPDATE mark_place SET contenido_mark='${contenido_mark}', lugar_mark='${lugar_mark}', id_usuario='${id_usuario}' WHERE id_mark = ${id}`;
    await conexion.query(query);
    res.json('Tienda Actualizada con exito');
}
//Elimina datos de usuario notificacion id
marketplace.delete = async (req, res) => {
    const id = req.params.id_mark;
    await conexion.query('DELETE FROM mark_place WHERE id_mark =$1', [id]);
    res.json(`Tienda ${id} Eliminado Satisfactoriamente`)
}
module.exports = marketplace;