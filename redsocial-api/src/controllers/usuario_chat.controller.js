const conexion = require('./conexionDB')
const usuario_chat = {};

usuario_chat.getusuario_chat = async (req, res) => {
    const id = req.params.id_chat;
    const response = await conexion.query(`SELECT usuario.id_usuario,usuario.nom_usuario,usuario.imagen_usuario
        FROM usuario_chat INNER JOIN usuario on usuario_chat.id_usuario=usuario.id_usuario
        where usuario_chat.id_chat=${id}
         order by usuario_chat.id_usuario DESC`);
    res.status(200).json(response.rows);
}

usuario_chat.registro = async (req, res) => {
    const { id_usuario,id_chat } = req.body;
    let query = `INSERT INTO public.usuario_chat(id_usuario, id_chat) VALUES ('${id_usuario}','${id_chat}')`;
    await conexion.query(query);
    res.status(200).json("Se ha realizado con exito ingreso de usuario propietario de chat");
}

//Actualiza datos de notificacion mediante id
usuario_chat.update = async (req, res) => {
    const id = req.params.id_chat;
    const {id_usuario} = req.body;
    let query = `UPDATE usuario_chat SET id_usuario='${id_usuario}' WHERE id_chat = ${id}`;
    await conexion.query(query);
    res.json('Actualizacion de chat de usuario con exito');
}

module.exports = usuario_chat;