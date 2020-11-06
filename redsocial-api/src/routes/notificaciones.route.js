const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const notificaciones = require('../controllers/notificaciones.controller');


router.get('/notificaciones',notificaciones.getnotificaciones);
router.get('/notificacion/:id_notif',notificaciones.getnotificacion);
router.post('/notificar',notificaciones.registro);
router.put('/updateNotificacion/:id_notif',notificaciones.update);
router.delete('/deleteNotificacion/:id_notif',notificaciones.delete);

module.exports= router;