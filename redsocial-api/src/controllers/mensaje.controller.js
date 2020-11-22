const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const mensajes = {};


mensajes.getmensajes = async (req, res) => {
    const response = await conexion.query(`SELECT id_mensaje,mensaje,estado,fecha_hora_mensaje,usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario,chat.id_chat,chat.fecha 
    FROM mensaje INNER JOIN usuario on mensaje.id_usuario=usuario.id_usuario
    INNER JOIN chat on mensaje.id_chat = chat.id_chat order by mensaje.id_mensaje DESC`);
    res.status(200).json(response.rows);
}

mensajes.getmensaje = async (req, res) => {
    const id = req.params.id_notif;
    const response = await conexion.query(`SELECT id_mensaje,mensaje,estado,fecha_hora_mensaje,usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario,chat.id_chat,chat.fecha 
    FROM mensaje INNER JOIN usuario on mensaje.id_usuario=usuario.id_usuario
    INNER JOIN chat on mensaje.id_chat = chat.id_chat   where mensaje.id_mensaje = ${id} order by mensaje.id_mensaje DESC`);
    res.status(200).json(response.rows);
}

mensajes.registro = async (req, res) => {
    const { mensaje, estado, fecha_hora_mensaje, id_chat, id_usuario } = req.body;
    let query = `INSERT INTO public.mensaje(id_mensaje, mensaje, estado, fecha_hora_mensaje, id_chat, id_usuario) VALUES ('${mensaje}','${estado}','${convertirFecha(fecha_hora_mensaje)}','${id_chat}','${id_usuario}')`;
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_mensaje) FROM mensaje LIMIT 1");
    const id_mensaje = result.rows[0].max;
    const response = await conexion.query(`SELECT id_mensaje,mensaje,estado,fecha_hora_mensaje,usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario,chat.id_chat,chat.fecha 
    FROM mensaje INNER JOIN usuario on mensaje.id_usuario=usuario.id_usuario
    INNER JOIN chat on mensaje.id_chat = chat.id_chat   where mensaje.id_mensaje = ${id_mensaje} order by mensaje.id_mensaje DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de notificacion mediante id
mensajes.update = async (req, res) => {
    const id = req.params.id_mensaje;
    const { mensaje, estado, fecha_hora_mensaje, id_chat, id_usuario } = req.body;
    let query = `UPDATE mensaje SET mensaje='${mensaje}',estado='${estado}', fecha_hora_mensaje='${fecha_hora_mensaje}', id_chat='${id_chat}',id_usuario='${id_usuario}' WHERE id_mensaje = ${id}`;
    await conexion.query(query);
    res.json('Mensaje Actualizado con exito');
}
//Elimina datos de usuario notificacion id
mensajes.delete = async (req, res) => {
    const id = req.params.id_mensaje;
    const response = await conexion.query('DELETE FROM usuario_chat WHERE id_mensaje =$1', [id]);
    await conexion.query('DELETE FROM mensaje WHERE id_mensaje =$1', [id]);
    res.json(`Notificacion ${id} Eliminado Satisfactoriamente`)
}
function convertirFecha(fecha) {
    var nFecha = new Date(fecha);
    let dia = nFecha.getDate();
    let mes = nFecha.getMonth();
    let anio = nFecha.getFullYear();
    let hora = nFecha.getHours();
    let minutos = nFecha.getMinutes();
    let segundos = nFecha.getSeconds();
    let diaCnv = '';
    let mesCnv = '';
    console.log(mes);
    if (mes < 10) {
        mesCnv = '0' + mes;
        if (dia < 10) {
            diaCnv = '0' + dia;
        }
    } else {
        mesCnv = mes + '';
    }
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
}
module.exports = mensajes;