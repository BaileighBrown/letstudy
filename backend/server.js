const express = require('express');
const http = require('http');

//mongoose creates the connection with the database 
const mongoose = require('mongoose');

//cors allows sharing, cross origin respurce requests || get info from different url 
const cors = require('cors');
require('dotenv').config();

//definig port number
const PORT = process.env.PORT || process.env.API_PORT;

//define that an express application is being created
const app = express();
app.use(express.json());
app.use(cors());

console.log('starting our server');

const server = http.createServer(app);

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