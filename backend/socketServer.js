// socket server with connect with the express server 
const authSocket = require('./middleware/authSocket')
const newConnectionHandler = require ('./socketHandlers/newConnectionHandler')
const disconnectHandler = require('./socketHandlers/disconnectHandler')
const serverStore = require ('./serverStore')

//main connection server
const registerSocketServer = (server)=>{
    const io = require('socket.io')(server, {
        cors: {
            origin:'*',
            method:['GET', 'POST'],
        },
    });

    serverStore.setSocketServerInstance(io);

    io.use((socket,next)=>{ //validate jwt token 
        authSocket(socket,next);
    })

//if its successful the io is handled with a connection event 
    io.on('connection',(socket)=>{
        console.log('user connected');//if a user connects 
        console.log(socket.id); // log user with socket id then passed to new connectuon handler 

        newConnectionHandler(socket, io)
        //new connection handler which is responsible for saving information of info on the server 

        socket.on('disconnect',()=>{
            disconnectHandler(socket)
        })
    })
}

module.exports = {
    registerSocketServer,
}