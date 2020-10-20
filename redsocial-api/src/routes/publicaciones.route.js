const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const publicaciones = require('../controllers/publicaciones.controller');
const storage = require('../controllers/multer')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');

router.get('/publicaciones',validacion.verifyToken,publicaciones.getpublicaciones);
router.get('/publicacion/:id_pub',validacion.verifyToken,publicaciones.getpublicacion);
router.post('/publicar',uploader,publicaciones.registro);


module.exports= router;