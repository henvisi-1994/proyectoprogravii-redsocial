const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const comentarios = require('../controllers/comentarios.controller')

router.post('/comentar',validacion.verifyToken,comentarios.registro);
router.get('/comentarios/:id_pub',comentarios.getcomentarios);

module.exports= router;