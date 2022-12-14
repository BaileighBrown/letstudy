const express = require('express');
const http = require('http');
const path = require('path');

//mongoose creates the connection with the database 
const mongoose = require('mongoose');

//cors allows sharing, cross origin resource requests || get info from different url 
const cors = require('cors');
require('dotenv').config();

//definig port number
const PORT = process.env.PORT || 5002;

// socket server 
const socketServer = require('./socketServer');
//define that an express application is being created
const app = express();
const authRoutes = require('./routes/authRoutes')
const friendInvitationRoutes = require('./routes/friendInvitationRoutes')

//middleware , express.json parses incoming JSON requests and puts the parsed data in req.body bc u are sending data. think about a twitter post
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//heroku deployment 
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));
}
app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
);


//register the routes with
// register the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);


const server = http.createServer(app);
socketServer.registerSocketServer(server)

//connecting to mongo atlas database, if connects successfully it will console listen on port 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //starting the server
server.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
});
})
.catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });

/*const db = process.env.MONGO_URI
db.once("open", () => {
    app.listen(PORT,()=>{
        console.log(`connected and running on ${PORT}`);
    })
});*/