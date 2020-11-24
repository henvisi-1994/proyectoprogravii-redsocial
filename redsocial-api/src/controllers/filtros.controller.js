const conexion = require('./conexionDB')
const filtros = {};
filtros.getFiltros = async (req, res) => {
    const response = await conexion.query("SELECT * FROM public.filtros ORDER BY id_filtro ASC ");
    res.status(200).json(response.rows);
}
module.exports = filtros;