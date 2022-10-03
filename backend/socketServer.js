// socket server with connect with the express server 

const registerSocektServer = (server)=>{
    const io = require('socket.io')(server, {
        cors: {
            origin:'*',
            method:['GET', 'POST'],
        },
    });
    io.on('connection',(socket)=>{
        console.log('user connected');
        console.log(socket.id);
    })
}

module.exports = {
    
    registerSocektServer
}