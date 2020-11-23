const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const mensajes = require('../controllers/mensaje.controller');
const usuarios_chat = require('../controllers/usuario_chat.controller');
const chats = require('../controllers/chat.controller');
const storage = require('../controllers/multer_chat')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');


router.get('/mensajes',mensajes.getmensajes);
router.get('/mensaje/:id_mensaje',mensajes.getmensaje);
router.post('/mensajear',uploader,mensajes.registro);
router.put('/updateMensaje/:id_mensaje',uploader,mensajes.update);
router.delete('/deleteMensaje/:id_mensaje',mensajes.delete);
router.get('/mensaje_chat/:id_chat',mensajes.getmensajes_chat);

//Rutas de Usuario chat
router.get('/usuarios_chat',usuarios_chat.getusuario_chat);
router.post('/usuario_chatear',usuarios_chat.registro);
router.put('/updateUsuario_chat/:id_chat',usuarios_chat.update);


//Rutas de Chat
router.get('/chat',chats.getchat);
router.post('/chatear',chats.registro);
router.put('/updateChat/:id_chat',chats.update);


module.exports= router;