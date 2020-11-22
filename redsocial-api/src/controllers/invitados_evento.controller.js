const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const invitados_evento = {};
invitados_evento.getinvitados = async (req, res) => {
    const response = await conexion.query("select  * from invitados_evento INNER JOIN evento on invitados_evento.id_evento = evento.id_evento INNER JOIN usuario on invitados_evento.id_usuario= usuario.id_usuario ORDER by invitados_evento.id_invitado DESC;");
    res.status(200).json(response.rows);
}

invitados_evento.getinvitado = async (req, res) => {
    const id = req.params.id_invitado;
    const response = await conexion.query(`select  * from invitados_evento INNER JOIN evento on invitados_evento.id_evento = evento.id_evento INNER JOIN usuario on invitados_evento.id_usuario= usuario.id_usuario  where invitados_evento.id_invitado = ${id} ORDER by invitados_evento.id_invitado DESC`);
    res.status(200).json(response.rows);
}

invitados_evento.registro = async (req, res) => {
    const {id_evento, estado_evento, id_usuario} = req.body;
    let query = `INSERT INTO public.invitados_evento(id_evento, estado_evento, id_usuario) VALUES ('${id_evento}','${estado_evento}','${id_usuario}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_invitado) FROM invitados_evento LIMIT 1");
    const id_invitado = result.rows[0].max;
    const response = await conexion.query(`select  * from invitados_evento INNER JOIN evento on invitados_evento.id_evento = evento.id_evento INNER JOIN usuario on invitados_evento.id_usuario= usuario.id_usuario where invitados_evento.id_invitado  = ${id_invitado} ORDER by invitados_evento.id_invitado DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de eventos mediante id
invitados_evento.update = async (req, res) => {
    const id = req.params.id_invitado;
    const {id_evento, estado_evento, id_usuario} = req.body;
    let query = `UPDATE invitados_evento SET id_evento='${id_evento}', estado_evento='${estado_evento}', id_usuario='${id_usuario}' WHERE id_invitado = ${id}`;
    await conexion.query(query);
    res.json('Invitados Actualizado con exito');
}
//Elimina datos de usuario notificacion id
invitados_evento.delete = async (req, res) => {
    const id = req.params.id_invitado;
    await conexion.query('DELETE FROM invitados_evento WHERE id_invitado =$1', [id]);
    res.json(`Invitados ${id} Eliminado Satisfactoriamente`)
}
module.exports = invitados_evento;