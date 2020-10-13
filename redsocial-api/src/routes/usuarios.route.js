const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
//Usuarios
const usuarios = require('../controllers/usuarios.controller')
const generos = require('../controllers/generos.controller')
router.post('/login',usuarios.loginUser);
router.get('/logout',validacion.verifyToken,usuarios.Logout);
router.get('/usuarios',validacion.verifyToken,usuarios.getusuarios);
router.get('/generos',generos.getGeneros);
router.get('/usuarioauth',validacion.verifyToken,usuarios.authUsuario);
router.post('/createUsuario',usuarios.registro);
router.put('/updateUsuario/:id_user',validacion.verifyToken,usuarios.update);
router.put('/updateContrasena/:id_user',usuarios.updateContrasena);
router.put('/confirmContrasena/:id_user',usuarios.confirmContrasena);
router.delete('/deleteUsuario/:id_user',validacion.verifyToken,usuarios.delete);


module.exports= router;