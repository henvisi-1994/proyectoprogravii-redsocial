const conexion = require('./conexionDB')
const comentarios = {};
comentarios.registro = async(req, res) => {
    const {contenido_com, fecha_hora_com, id_usuario, id_pub } = req.body;
    let query = `INSERT INTO comentario(contenido_com, fecha_hora_com, id_usuario, id_pub) VALUES ('${contenido_com}','${fecha_hora_com}','${id_usuario}','${id_pub}')`;
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_com) FROM comentario LIMIT 1");
    const id = result.rows[0].max;
    const response = await conexion.query(`select *from view_get_comentarios where id_com=${id}`);
    res.status(200).json(response.rows);
}
comentarios.getcomentarios = async (req, res) => {
    const id = req.params.id_pub;
    const response = await conexion.query(`select *from view_get_comentarios where id_pub=${id}`);
    res.status(200).json(response.rows);
}

module.exports = comentarios;