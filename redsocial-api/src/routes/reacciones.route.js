const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const reacciones = require('../controllers/reacciones.controller');
router.get('/reacciones/:id_pub',validacion.verifyToken,reacciones.getreacciones);
router.get('/reaccion/:id_pub',validacion.verifyToken,reacciones.getreaccion);
router.post('/reaccionar',reacciones.registro);
router.post('/otravez',reacciones.actualizar);
router.post('/noreac',reacciones.borrar);


module.exports= router;