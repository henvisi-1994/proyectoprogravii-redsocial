const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const detalles_prod = {};
detalles_prod.getdetalleprod = async (req, res) => {
    const response = await conexion.query(`select catalogo.id_catalogo,catalogo.nombre_catalogo,productos.id_producto,productos.nombre_producto,productos.descripcion_producto,
	productos.imagen_product,productos.precio_product
	from detalle_product INNER join catalogo on detalle_product.id_catalogo=catalogo.id_catalogo 
	INNER join productos on detalle_product.id_producto=productos.id_producto  ORDER by detalle_product.id_producto DESC;`);
    res.status(200).json(response.rows);
}
detalles_prod.registro = async (req, res) => {
    const {id_catalogo,id_producto} = req.body;
    let query = `INSERT INTO public.detalle_product(id_catalogo, id_producto) VALUES ('${id_catalogo}','${id_producto}')`;
    console.log(query);
    await conexion.query(query);
    res.status(200).json(response.rows);
}

module.exports = detalles_prod;