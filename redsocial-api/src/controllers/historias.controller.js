const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const historias = {};


historias.gethistorias = async (req, res) => {
    const response = await conexion.query("SELECT * FROM historias INNER JOIN usuario on historias.id_usuario = usuario.id_usuario  order by historias.id_pub DESC");
    res.status(200).json(response.rows);
}

historias.gethistoriausuario = async (req, res) => {
    const id = req.params.id_usuario;
    const response = await conexion.query(`SELECT historias.id_historia,historias.id_usuario,historias.imagen_historia,usuario.nom_usuario,usuario.imagen_usuario FROM historias INNER JOIN usuario on historias.id_usuario = usuario.id_usuario where historias.id_usuario= ${id} order by historias.id_historia DESC `);
    res.status(200).json(response.rows);
}

historias.registro = async(req, res) => {
    const {url,id_usuario} = req.body;
    const urli = `${url}/historias/${req.file.filename}`;
    let query = `INSERT INTO public.historias( imagen_historia, id_usuario) VALUES ('${urli}','${id_usuario}')`;
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_historia) FROM historias LIMIT 1");
    const id = result.rows[0].max;
    const response = await conexion.query(`SELECT * FROM historias INNER JOIN usuario on historias.id_usuario = usuario.id_usuario where historias.id_historia=${id} order by historias.id_historia DESC`);
    res.status(200).json(response.rows);
}
module.exports = historias;