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
router.put('/updateUsuario/:id_usuario',validacion.verifyToken,usuarios.update);
router.put('/updateContrasena/:id_usuario',usuarios.updateContrasena);
router.put('/confirmContrasena/:id_usuario',usuarios.confirmContrasena);
router.delete('/deleteUsuario/:id_usuario',validacion.verifyToken,usuarios.delete);

//amigos
router.post('/registrarAmigo',amigos.registro);
router.put('/updateAmigo/:id_usuario',validacion.verifyToken,amigos.update);
router.get('/aceptarAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.aceptar_amistad);
router.get('/bloquearAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.bloquear_amistad);
router.get('/desbloquearAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.desbloquear_amistad);
router.get('/seguirAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.seguir_amigo);
router.get('/dejarseguirAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.dejar_seguir_amigo);
router.delete('/deleteAmigo/:id_usuario/:id_amigo',validacion.verifyToken,amigos.delete);
router.get('/amigo/:id_usuario',amigos.getamigos);
router.get('/seguidores/:id_usuario',amigos.getcantSeguid);
router.get('/solocitudesAmistad/:id_usuario', validacion.verifyToken, amigos.getSolicitudAmigos);

module.exports= router;