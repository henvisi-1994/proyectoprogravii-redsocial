const conexion = require('./conexionDB');
const jwt = require('jsonwebtoken');

const catalogo = {};

catalogo.getcatalogo = async (req, res) => {
    const response = await conexion.query(`select *from catalogo`);
    res.status(200).json(response.rows);
}

module.exports = catalogo;