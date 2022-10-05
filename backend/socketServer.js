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

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit("online-users", { onlineUsers });
      };

//if its successful the io is handled with a connection event 
    io.on('connection',(socket)=>{
        console.log('user connected');//if a user connects 
        console.log(socket.id); // log user with socket id then passed to new connectuon handler 

        newConnectionHandler(socket, io)
        emitOnlineUsers();
        //new connection handler which is responsible for saving information of info on the server 

        socket.on('disconnect',()=>{
            disconnectHandler(socket)
        })
    })
    //excuting the online user on client side 
    setInterval(() => {
        emitOnlineUsers();
      }, [1000 * 8]); //every 8 seconds
}

module.exports = {
    registerSocketServer,
}