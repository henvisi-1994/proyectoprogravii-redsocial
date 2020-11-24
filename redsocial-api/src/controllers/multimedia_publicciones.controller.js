const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const mPublicaciones = {};
mPublicaciones.registro = async (req, res) => {
    const { id_pub, url, id_type, id_filtro } = req.body;
    const urli = `${url}/publicaciones/${req.file.filename}`;
    let query = `INSERT INTO multimedia_publicacion(id_pub, contenido_mult, id_type, id_filtro) VALUES ('${id_pub}','${urli}','${id_type}','${id_filtro}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_mult) FROM multimedia_publicacion LIMIT 1");
    const id = result.rows[0].max;
    const response = await conexion.query(`SELECT apellidos_usuario,contenido_mult,email_usuario,fecha_bub,"multimedia_publicacion".id_filtro,"multimedia_publicacion".id_mult,publicacion.id_pub,"multimedia_publicacion".id_type,publicacion.id_usuario,imagen_usuario,nom_usuario,nombres_usuario FROM "multimedia_publicacion" INNER JOIN publicacion on multimedia_publicacion.id_pub = publicacion.id_pub INNER JOIN usuario on (select id_usuario from publicacion where id_pub ="multimedia_publicacion".id_pub )= usuario.id_usuario where id_mult = ${id}`);
    res.status(200).json(response.rows);
}
mPublicaciones.getPublicacion = async(req, res) =>{
    const id = req.params.id_pub;
    const response = await conexion.query(`SELECT contenido_mult,"multimedia_publicacion".id_type,"multimedia_publicacion".id_pub,"multimedia_publicacion".id_filtro FROM "multimedia_publicacion" INNER JOIN publicacion on multimedia_publicacion.id_pub = publicacion.id_pub INNER JOIN usuario on (select id_usuario from publicacion where id_pub ="multimedia_publicacion".id_pub )= usuario.id_usuario  where "multimedia_publicacion".id_pub=${id} order by publicacion.id_pub DESC`);
    res.status(200).json(response.rows);
}

module.exports = mPublicaciones;
