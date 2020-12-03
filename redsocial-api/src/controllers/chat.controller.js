const conexion = require('./conexionDB')
const chats = {};

chats.getchat = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`SELECT chat.id_chat,chat.fecha,chat.nomb_chat
    FROM usuario_chat INNER JOIN chat on usuario_chat.id_chat=chat.id_chat
    where usuario_chat.id_usuario=${id}
    order by usuario_chat.id_chat DESC`);

    res.status(200).json(response.rows);
}

chats.registro = async (req, res) => {
    const {fecha,nomb_chat} = req.body;
    let query = `INSERT INTO public.chat(fecha, nomb_chat) VALUES ('${fecha}','${nomb_chat}')`;
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_chat) FROM chat LIMIT 1"); 
    const id_chat = result.rows[0].max;
    const resultado= await conexion.query(`SELECT id_chat, fecha, nomb_chat FROM public.chat WHERE chat.id_chat=${id_chat}`);
    res.status(200).json(resultado.rows);
}

//Actualiza datos de notificacion mediante id
chats.update = async (req, res) => {
    const id = req.params.id_chat;
    let query = `UPDATE chat SET fecha='${fecha}',nomb_chat='${nomb_chat}' WHERE id_chat = ${id}`;
    await conexion.query(query);
    res.json('Actualizacion de chat con exito');
}

module.exports = chats;