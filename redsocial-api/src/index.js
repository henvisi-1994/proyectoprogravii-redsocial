`use strict`
const path = require('path')
const cors = require('cors');
require('./passport/autenticacion')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const socketIO = require('socket.io')


//Sessions
const passport = require('passport')
const redis = require('redis')
const ExpressSession = require('express-session');
const { Socket } = require('dgram');
const { SSL_OP_NO_TICKET } = require('constants');
const RedisStore = require('connect-redis')(ExpressSession)
const publicaciones = [];
const messages = [];
const comentarios = [];
const eventos = [];
const reacciones=[];
const redisClient = redis.createClient({
    host: 'localhost',
    port: '6379',
    password: '',
    db: '1',
});

var expiryDate = (3.154e+10);

const SessionMiddleware = ExpressSession({
    store: new RedisStore({ client: redisClient }),
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    name: 'sessionID',
    cookie: {
        secure: false,
        expires: true,
        maxAge: expiryDate, //Expira en 1 año
    }
})

//Midelwares
app.use(SessionMiddleware)
app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(passport.initialize()); 
app.use(passport.session()); 

//Comunicación con otro servidor
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header()
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200'); //frontend server //antes estaba localhost en lugar de la IP http://localhost:4200
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
}); 

app.set('port',process.env.PORT || 4000)

//Archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

//Rutas
app.use(require('./routes/usuarios.route'));
app.use(require('./routes/publicaciones.route'));
app.use(require('./routes/comentarios.route'));
app.use(require('./routes/notificaciones.route'));
app.use(require('./routes/mensaje.route'));
app.use(require('./routes/eventos.route'));
app.use(require('./routes/historia.route'));
app.use(require('./routes/reacciones.route'));

const server=app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})

const io=socketIO.listen(server)

io.on('connection',(socket)=>{
    socket.on('publicar',function(data){
        publicaciones.push(data[0]);
        socket.emit('obtener-publicacion',publicaciones);
        socket.broadcast.emit('obtener-publicacion',publicaciones);
    })
    socket.on('enviar-invitacion', function(data){
        eventos.push(data[0]);
        socket.emit('obtener-invitacion',eventos);
        socket.broadcast.emit('obtener-invitacion',eventos);
    })
    socket.on('comentar',function (data) {
        comentarios.push(data);
        socket.emit('obtener-comentario',comentarios);
        socket.broadcast.emit('obtener-comentario',comentarios);
    })
    socket.on('escribir-comentario',function (data) {
        socket.broadcast.emit('notificar-comentario',data);
    })
    socket.on('notificar',function (data) {
        socket.emit('obtener-notificacion',data);
        socket.broadcast.emit('obtener-notificacion',data);
    })
    socket.on('eliminar-publicacion', function (data) {
        socket.emit('publicacion-eliminada',data);
        socket.broadcast.emit('publicacion-eliminada',data);
    })
    socket.on('aceptar-solicitud', function (data) {
        socket.emit('recibir-aceptacion', data);
        socket.broadcast.emit('recibir-aceptacion',data);
    })
    socket.on('enviar-solicitud', function (data) {
        socket.emit('recibir-solicitud', data);
        socket.broadcast.emit('recibir-solicitud',data);
    })
    socket.on('reaccionar',function(data){
        reacciones.push(data[0]);
        socket.emit('obtener-reaccion',reacciones);
        socket.broadcast.emit('obtener-reaccion',reacciones);
    })

    //Chat
    socket.on('iniciar-chat',function (data) {
        socket.emit('recibir-chat',data);
      socket.broadcast.emit('recibir-chat', data);
    })

    socket.on('new-message', message => {
        messages.push(message)
        socket.emit('new-message', messages)
        socket.broadcast.emit('new-message', messages);
      })
  
      socket.on('writing', user => {
        socket.emit('writing', user)
      })
  
      socket.on('delete-message', id => {
        let index = -1
        let deleteMessages = messages.filter((message, i) => {
          return message.id == id ? index = i : false
        })
  
        messages.splice(index, 1)
  
        sockets.emit('new-message', messages)
      })

})