const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const eventos = {};
eventos.geteventos = async (req, res) => {
    const response = await conexion.query("select  * from evento  ORDER by evento.id_evento DESC;");
    res.status(200).json(response.rows);
}

eventos.getevento = async (req, res) => {
    const id = req.params.id_evento;
    const response = await conexion.query(`select  * from evento  where evento.id_evento  = ${id} order by evento.id_evento DESC`);
    res.status(200).json(response.rows);
}

eventos.registro = async (req, res) => {
    const {fecha_hora_evento, lugar_evento, url, nombre_evento, fecha_finalizacion} = req.body;
    const urli = `${url}/eventos/${req.file.filename}`;
    let query = `INSERT INTO public.evento(fecha_hora_evento, lugar_evento, logo, nombre_evento, fecha_finalizacion) VALUES ('${convertirFecha(fecha_hora_evento)}','${lugar_evento}','${urli}','${nombre_evento}','${convertirFecha(fecha_finalizacion)}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_evento) FROM evento LIMIT 1");
    const id_evento = result.rows[0].max;
    const response = await conexion.query(`select  * from evento  where evento.id_evento  = ${id_evento} order by evento.id_evento DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de eventos mediante id
eventos.update = async (req, res) => {
    const id = req.params.id_evento;
    const { fecha_hora_evento, lugar_evento, url, nombre_evento, fecha_finalizacion} = req.body;
    const urli = `${url}/eventos/${req.file.filename}`;
    let query = `UPDATE evento SET fecha_hora_evento='${fecha_hora_evento}', lugar_evento='${lugar_evento}', logo='${urli}', nombre_evento='${nombre_evento}', fecha_finalizacion='${fecha_finalizacion}' WHERE id_evento = ${id}`;
    await conexion.query(query);
    res.json('Evento Actualizado con exito');
}
//Elimina datos de usuario notificacion id
eventos.delete = async (req, res) => {
    const id = req.params.id_evento;
    await conexion.query('DELETE FROM evento WHERE id_evento =$1', [id]);
    res.json(`Evento ${id} Eliminado Satisfactoriamente`)
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
    console.log(mesCnv);
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
}
module.exports = eventos;