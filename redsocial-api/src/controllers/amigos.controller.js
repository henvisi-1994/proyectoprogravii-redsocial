const conexion = require('./conexionDB')
const amigos = {};
amigos.registro = async(req, res) => {
    const {es_aceptada, fecha_emision_amigo, es_seguido, es_seguidor, es_bloqueado, id_usuario, id_amigo } = req.body;
    let query = `INSERT INTO amigos(es_aceptada, fecha_emision_amigo, es_seguido, es_seguidor, es_bloqueado, id_usuario, id_amigo) VALUES ('${es_aceptada}', '${fecha_emision_amigo}','${es_seguido}', '${es_seguidor}', '${es_bloqueado}', '${id_usuario}', '${id_amigo}')`;
    await conexion.query(query);
    const response = await conexion.query(`SELECT * from amigos,usuario where amigos.id_amigo = usuario.id_usuario and amigos.id_usuario = ${id_usuario} and es_aceptada = false `);
      res.status(200).json(response.rows);
}
//Actualiza datos de Usuario mediante id
amigos.update = async (req, res) => {
    const id = req.params.id_usuario;
    const {es_aceptada, fecha_emision_amigo, fecha_aceptacion_amigo, es_seguido, es_seguidor, es_bloqueado,id_amigo } = req.body;
    let query = `UPDATE amigos SET es_aceptada='${es_aceptada}', fecha_emision_amigo='${fecha_emision_amigo}', fecha_aceptacion_amigo='${fecha_aceptacion_amigo}',es_seguido='${es_seguido}', es_seguidor='${es_seguidor}',es_bloqueado='${es_bloqueado}', id_amigo='${id_amigo}' WHERE id_usuario = ${id}`;
    await conexion.query(query);
    res.json('Amistad Actualizada con exito');
}
amigos.aceptar_amistad = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    let query = `UPDATE amigos SET es_aceptada='true' WHERE id_amigo = ${id} and id_usuario = ${id_usuario}`;
    await conexion.query(query);
    res.json('Amistad Aceptada con exito');
}
amigos.bloquear_amistad = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    let query = `UPDATE amigos SET es_bloqueado='true' WHERE id_amigo = ${id} and id_usuario = ${id_usuario}`;
    await conexion.query(query);
    res.json('Amistad Aceptada con exito');
}
amigos.desbloquear_amistad = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    let query = `UPDATE amigos SET es_bloqueado='false' WHERE id_amigo = ${id} and id_usuario = ${id_usuario}`;
    await conexion.query(query);
    res.json('Amistad Aceptada con exito');
}
amigos.seguir_amigo = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    let query = `UPDATE amigos SET es_seguido='true' WHERE id_amigo = ${id} and id_usuario = ${id_usuario}`;
    await conexion.query(query);
    res.json('Amistad Aceptada con exito');
}
amigos.dejar_seguir_amigo = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    let query = `UPDATE amigos SET es_seguido='false' WHERE id_amigo = ${id} and id_usuario = ${id_usuario}`;
    await conexion.query(query);
    res.json('Amistad Aceptada con exito');
}
//Elimina datos de usuario mediante id
amigos.delete = async (req, res) => {
    const id = req.params.id_amigo;
    const id_usuario = req.params.id_usuario;
    const response = await conexion.query(`DELETE FROM amigos WHERE id_amigo = ${id} and id_usuario =${id_usuario}`);
    res.json(`usuario ${id} Eliminado Satisfactoriamente`)
}
amigos.getamigos = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`SELECT * from amigos,usuario where amigos.id_amigo = usuario.id_usuario and amigos.id_usuario = ${id} and es_aceptada = true`);
    res.status(200).json(response.rows);
}
amigos.getSolicitudAmigos = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`SELECT es_aceptada, fecha_emision_amigo,es_seguido, es_bloqueado, amigos.id_usuario,amigos.id_amigo,usuario.nom_usuario, usuario.imagen_usuario from amigos,usuario where amigos.id_amigo = usuario.id_usuario and amigos.id_usuario = ${id} and es_aceptada = false`);
    res.status(200).json(response.rows);
}
amigos.getcantSeguid = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`select count(es_seguido) from amigos where es_seguido = true and id_usuario = ${id}`);
    res.status(200).json(response.rows);
}
module.exports = amigos;