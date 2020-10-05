const jwt = require('jsonwebtoken');
const validaciones = {};
const SECRET_KEY = 'rd**'

// Funcion que valida la existencia de un token por usuario
validaciones.verifyToken = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('No esta autorizado para ver esto');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('No esta autorizado para ver esto');
		}

		const payload = await jwt.verify(token, SECRET_KEY);
		if (!payload) {
			return res.status(401).send('No esta autorizado para ver esto');
		}
		req.id_usuario = payload._id;
		next();
	} catch(e) {
		console.log(e)
		return res.status(401).send('No esta autorizado para ver esto');
	}
}

module.exports = validaciones;
