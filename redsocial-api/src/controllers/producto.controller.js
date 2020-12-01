const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const productos = {};
productos.getproductos = async (req, res) => {
    const response = await conexion.query("select  * from productos  ORDER by productos.id_producto DESC;");
    res.status(200).json(response.rows);
}

productos.getproducto = async (req, res) => {
    const id = req.params.id_producto;
    const response = await conexion.query(`select  * from productos  where productos.id_producto  = ${id} order by productos.id_producto DESC`);
    res.status(200).json(response.rows);
}

productos.registro = async (req, res) => {
    const {nombre_producto, descripcion_producto, imagen_product, precio_product,id_mark} = req.body;
    const urli = `${url}/productos/${req.file.filename}`;
    let query = `INSERT INTO public.productos(nombre_producto, descripcion_producto, imagen_product, precio_product) VALUES ('${nombre_producto}','${descripcion_producto}','${urli}','${precio_product}','${id_mark}')`;
    console.log(query);
    await conexion.query(query);
    const result = await conexion.query("SELECT  MAX(id_producto) FROM productos LIMIT 1");
    const id_producto = result.rows[0].max;
    const response = await conexion.query(`select  * from productos  where productos.id_producto  = ${id_producto} order by productos.id_producto DESC`);
    res.status(200).json(response.rows);
}

//Actualiza datos de eventos mediante id
productos.update = async (req, res) => {
    const id = req.params.id_producto;
    const { nombre_producto, descripcion_producto, imagen_product, precio_product,id_mark} = req.body;
    const urli = `${url}/productos/${req.file.filename}`;
    let query = `UPDATE productos SET nombre_producto='${nombre_producto}', descripcion_producto='${descripcion_producto}', imagen_product='${urli}', precio_product='${precio_product}', id_mark='${id_mark}' WHERE id_producto = ${id}`;
    await conexion.query(query);
    res.json('Producto Actualizado con exito');
}
//Elimina datos de usuario notificacion id
productos.delete = async (req, res) => {
    const id = req.params.id_producto;
    await conexion.query('DELETE FROM productos WHERE id_producto =$1', [id]);
    res.json(`Producto ${id} Eliminado Satisfactoriamente`)
}

module.exports = productos;