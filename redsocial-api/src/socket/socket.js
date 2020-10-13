module.exports = function (server, SessionMiddleware) {
    //Importamos Socket IO y configuramos las sessiones en el/
    const SocketIO = require('socket.io')
    const io = SocketIO(server)
    io.use((socket, next) => {
        SessionMiddleware(socket.request, socket.request.res, next);
    });
}
