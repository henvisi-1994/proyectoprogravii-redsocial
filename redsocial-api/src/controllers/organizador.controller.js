const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const organizador = {};
organizador.getorganizadores = async (req, res) => {
    const response = await conexion.query("select  * from organizador INNER JOIN evento on organizador.id_evento = evento.id_evento INNER JOIN usuario on organizador.id_usuario = usuario.id_usuario ORDER by organizador.id_organizador DESC;");
    res.status(200).json(response.rows);
}

organizador.getorganizador = async (req, res) => {
    const id = req.params.id_evento;
    const response = await conexion.query(`select  * from organizador INNER JOIN evento on organizador.id_evento = evento.id_evento INNER JOIN usuario on organizador.id_usuario = usuario.id_usuario  where organizador.id_evento  = ${id} ORDER by organizador.id_organizador DESC`);
    res.status(200).json(response.rows);
}
organizador.getorganizadorUsuario = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`select  * from organizador INNER JOIN evento on organizador.id_evento = evento.id_evento INNER JOIN usuario on organizador.id_usuario = usuario.id_usuario  where organizador.id_usuario  = ${id} ORDER by organizador.id_organizador DESC`);
    res.status(200).json(response.rows);
}

organizador.registro = async (req, res) => {
    const {id_evento, id_usuario} = req.body;
    let query = `INSERT INTO public.organizador(id_evento, id_usuario) VALUES ('${id_evento}','${id_usuario}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_organizador) FROM organizador LIMIT 1");
    const id_organizador = result.rows[0].max;
    const response = await conexion.query(`select  * from organizador INNER JOIN evento on organizador.id_evento = evento.id_evento INNER JOIN usuario on organizador.id_usuario = usuario.id_usuario  where organizador.id_organizador  = ${id_organizador} order by organizador.id_organizador DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de eventos mediante id
organizador.update = async (req, res) => {
    const id = req.params.id_evento;
    const {id_usuario} = req.body;
    let query = `UPDATE organizador SET  id_usuario='${id_usuario}' WHERE id_evento = ${id}`;
    await conexion.query(query);
    res.json('Organizador Actualizado con exito');
}
//Elimina datos de usuario notificacion id
organizador.delete = async (req, res) => {
    const id = req.params.id_evento;
    await conexion.query('DELETE FROM organizador WHERE id_evento =$1', [id]);
    res.json(`Organizador ${id} Eliminado Satisfactoriamente`)
}
module.exports = organizador;