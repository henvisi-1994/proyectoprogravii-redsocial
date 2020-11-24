const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const publicaciones = require('../controllers/publicaciones.controller');
const multimedia = require('../controllers/multimedia_publicciones.controller');
const filtro = require('../controllers/filtros.controller')
const storage = require('../controllers/multer')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');

router.get('/publicaciones',validacion.verifyToken,publicaciones.getpublicaciones);
router.get('/publicacion/:id_pub',validacion.verifyToken,publicaciones.getpublicacion);
router.post('/publicar',validacion.verifyToken,publicaciones.registro);
router.post('/guardarImagen',validacion.verifyToken,uploader,multimedia.registro);
router.get('/imagen/:id_pub',validacion.verifyToken,multimedia.getPublicacion);
router.get('/filtros',validacion.verifyToken,filtro.getFiltros);

module.exports= router;