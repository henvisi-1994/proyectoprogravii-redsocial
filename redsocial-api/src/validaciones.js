const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');//Encriptacion para contraseñas

const validaciones = {};
const SECRET_KEY = 'rd**'

//Función que compara la contraseña encriptada
validaciones.CompararPassword = (passwordIngresada, passwordUsuario) => {
    try {
        return bcrypt.compareSync(passwordIngresada, passwordUsuario);
        //compara la contraseña ingresada por el formulario, con la que existe en a base de datos, la mismas que estarán encryptadas
        //retorna true si coinciden y false en caso de que no 
    } catch (error) {
        console.log('Error al comparar contraseñas encriptadas: ' + error)
    }
};

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

validaciones.EstaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('No está auntenticado')
}

module.exports = validaciones;
