const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const historias = require('../controllers/historias.controller');
const storage = require('../controllers/multer_historias')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');


router.get('/historias',validacion.verifyToken,historias.gethistorias);
router.get('/historia/:id_usuario',validacion.verifyToken,historias.gethistoriausuario);
router.post('/publicar_historia',uploader,historias.registro);

module.exports= router;