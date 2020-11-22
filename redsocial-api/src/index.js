`use strict`
const path = require('path')
const cors = require('cors');
require('./passport/autenticacion')
const morgan = require('morgan'); //Importación de Middleware
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const socketIO = require('socket.io')


//Sessions
const passport = require('passport')//Para validar inicio de session con passport
const redis = require('redis')
const ExpressSession = require('express-session');
const { Socket } = require('dgram');
const RedisStore = require('connect-redis')(ExpressSession) //Almacenar sesiones con en Redis
const publicaciones = [];
const comentarios = [];
const redisClient = redis.createClient({
    host: 'ec2-3-225-139-129.compute-1.amazonaws.com',
    port: '12329',
    password: '', //Nota: Configurar clave de servidor Redis
    db: '1',
});

var expiryDate = (3.154e+10);

const SessionMiddleware = ExpressSession({
    store: new RedisStore({ client: redisClient }), //Aqui se pone el hash de configuración, tal como puerto, contraseña, ip del servidor de redis...
    secret: "secretkey",
    resave: false, //Si ponemos en true guarda demasiadas sessiones
    saveUninitialized: false,
    name: 'sessionID',
    cookie: {
        secure: false,
        expires: true,
        maxAge: expiryDate, // 86400000 --> 24 Horas //3.154e+10 --> 1 año
    }
})

app.use(SessionMiddleware)
//midelwares
app.use(morgan('dev')); //Permite ver en consola el intercambio de datos mediante las peticiones http
app.use(bodyParser.json()); //Para leer peticiones application/JSON
app.use(bodyParser.urlencoded({ extended: true })) //Para leer peticiones http (get/post)
app.use(passport.initialize()); //Inicializa la libreria passport
app.use(passport.session()); //Llama a la función session de passport

//comunicar con otro servidor
app.use(cors({ //Cors permite la comunicacion entre dos servidores
    origin: ['http://localhost:4200'], //frontend server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // true enable set cookie
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

//static files
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use(require('./routes/usuarios.route'));
app.use(require('./routes/publicaciones.route'));
app.use(require('./routes/comentarios.route'));
app.use(require('./routes/notificaciones.route'));
app.use(require('./routes/mensaje.route'));


const server=app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})

const io=socketIO.listen(server)

io.on('connection',(socket)=>{
    socket.on('publicar',function(data){
        publicaciones.push(data);
        socket.emit('obtener-publicacion',publicaciones);
        socket.broadcast.emit('obtener-publicacion',publicaciones);
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
	//Chat
    socket.on('new-message', message => {
        messages.push(message)
        io.sockets.emit('new-message', messages)
      })
  
      socket.on('writing', user => {
        io.sockets.emit('writing', user)
      })
  
      socket.on('delete-message', id => {
        let index = -1
        let deleteMessages = messages.filter((message, i) => {
          return message.id == id ? index = i : false
        })
  
        messages.splice(index, 1)
  
        io.sockets.emit('new-message', messages)
      })
})