const {Router } = require('express');
const router = Router();
const validacion = require('../validaciones.js');
const eventos = require('../controllers/evento.controller');
const organizador = require('../controllers/organizador.controller');
const invitados_evento = require('../controllers/invitados_evento.controller');
const storage = require('../controllers/multer_evento')
const multer = require('multer');
const uploader = multer ({ storage }).single('file');

//eventos
router.get('/eventos',eventos.geteventos);
router.get('/evento/:id_evento',eventos.getevento);
router.put('/updateEvento/:id_evento',uploader,eventos.update);
router.delete('/deleteEvento/:id_evento',eventos.delete);
router.post('/realizarEvento',uploader,eventos.registro);
//organizador 
router.get('/organizadores',organizador.getorganizadores);
router.get('/organizador/:id_evento',organizador.getorganizador);
router.get('/organizadorUsuario/:id_usuario',organizador.getorganizadorUsuario);
router.post('/registrarOrganizador',organizador.registro);
router.put('/updateOrganizador/:id_evento',organizador.update);
router.delete('/deleteOrganizador/:id_evento',organizador.delete);
//invitados_evento
router.get('/invitados',invitados_evento.getinvitados);
router.get('/invitado/:id_invitado',invitados_evento.getinvitado);
router.post('/registrarInvitado',invitados_evento.registro);
router.put('/updateInvitados/:id_invitado',invitados_evento.update);
router.delete('/deleteInvitados/:id_invitado',invitados_evento.delete);

module.exports= router;