const express = require('express');
const http = require('http');

//mongoose creates the connection with the database 
const mongoose = require('mongoose');

//cors allows sharing, cross origin resource requests || get info from different url 
const cors = require('cors');
require('dotenv').config();

//definig port number
const PORT = process.env.PORT || process.env.API_PORT;

// socket server 
const socketServer = require('./socketServer');
//define that an express application is being created
const app = express();
const authRoutes = require('./routes/authRoutes')
const friendInvitationRoutes = require('./routes/friendInvitationRoutes')

//middleware , express.json parses incoming JSON requests and puts the parsed data in req.body bc u are sending data. think about a twitter post
app.use(express.json());
app.use(cors());

//register the routes with
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server)

//connecting to mongo atlas database, if connects successfully it will console listen on port 
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    //starting the server
server.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
});
})
.catch(err =>{
    console.log('server not started. Connection failed');
    console.log(err);
})