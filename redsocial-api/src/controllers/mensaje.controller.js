const conexion = require("./conexionDB");
const jwt = require("jsonwebtoken");

const mensajes = {};

mensajes.getmensajes = async (req, res) => {
  const response = await conexion.query(`SELECT *from view_mensaje`);
  res.status(200).json(response.rows);
};

mensajes.getmensajes_chat = async (req, res) => {
  const id = req.params.id_chat;
  const response = await conexion.query(
    `SELECT *from view_mensaje where view_mensaje.id_chat=${id}`
  );
  res.status(200).json(response.rows);
};

mensajes.getmensaje = async (req, res) => {
  const id = req.params.id_mensaje;
  const response = await conexion.query(
    `SELECT *from view_mensaje  where view_mensaje.id_mensaje = ${id}`
  );
  res.status(200).json(response.rows);
};

mensajes.registro = async (req, res) => {
  let query;
  const {
    mensaje,
    estado,
    fecha_hora_mensaje,
    id_chat,
    id_usuario,
    url,
  } = req.body;
  if (typeof req.file != "undefined") {
    const urli = `${url}/chat/${req.file.filename}`;
    query = `INSERT INTO public.mensaje(id_mensaje, mensaje, estado, fecha_hora_mensaje, id_chat, id_usuario,ruta_archivo, file_name) VALUES ('${mensaje}','${estado}','${convertirFecha(
      fecha_hora_mensaje
    )}','${id_chat}','${id_usuario},'${urli},'${req.file.filename}')`;
  }
  else{
    query = `INSERT INTO public.mensaje(id_mensaje, mensaje, estado, fecha_hora_mensaje, id_chat, id_usuario) VALUES ('${mensaje}','${estado}','${convertirFecha(
        fecha_hora_mensaje
      )}','${id_chat}','${id_usuario}')`;

  }

  await conexion.query(query);
  const result = await conexion.query(
    "SELECT  MAX(id_mensaje) FROM mensaje LIMIT 1"
  );
  const id_mensaje = result.rows[0].max;
  const response = await conexion.query(
    ` SELECT *from view_mensaje   where view_mensaje.id_mensaje = ${id_mensaje}`
  );
  res.status(200).json(response.rows);
};

//Actualiza datos de notificacion mediante id
mensajes.update = async (req, res) => {
let query;
  const id = req.params.id_mensaje;
  const {
    mensaje,
    estado,
    fecha_hora_mensaje,
    id_chat,
    id_usuario,
    url,
  } = req.body;
  if (typeof req.file != "undefined"){
    const urli = `${url}/chat/${req.file.filename}`;
     query = `UPDATE mensaje SET mensaje='${mensaje}',estado='${estado}', fecha_hora_mensaje='${fecha_hora_mensaje}', id_chat='${id_chat}',id_usuario='${id_usuario}',ruta_archivo='${urli}',file_name='${req.file.filename}' WHERE id_mensaje = ${id}`;

  }
  else{
    `UPDATE mensaje SET mensaje='${mensaje}',estado='${estado}', fecha_hora_mensaje='${fecha_hora_mensaje}', id_chat='${id_chat}',id_usuario='${id_usuario}' WHERE id_mensaje = ${id}`;
  }
  
  await conexion.query(query);
  res.json("Mensaje Actualizado con exito");
};
//Elimina datos de usuario notificacion id
mensajes.delete = async (req, res) => {
  const id = req.params.id_mensaje;
  const response = await conexion.query(
    "DELETE FROM usuario_chat WHERE id_mensaje =$1",
    [id]
  );
  await conexion.query("DELETE FROM mensaje WHERE id_mensaje =$1", [id]);
  res.json(`Notificacion ${id} Eliminado Satisfactoriamente`);
};
function convertirFecha(fecha) {
  var nFecha = new Date(fecha);
  let dia = nFecha.getDate();
  let mes = nFecha.getMonth();
  let anio = nFecha.getFullYear();
  let hora = nFecha.getHours();
  let minutos = nFecha.getMinutes();
  let segundos = nFecha.getSeconds();
  let diaCnv = "";
  let mesCnv = "";
  console.log(mes);
  if (mes < 10) {
    mesCnv = "0" + mes;
    if (dia < 10) {
      diaCnv = "0" + dia;
    }
  } else {
    mesCnv = mes + "";
  }
  return (
    anio +
    "-" +
    mesCnv +
    "-" +
    dia +
    " " +
    hora +
    ":" +
    minutos +
    ":" +
    segundos
  );
}

module.exports = mensajes;
