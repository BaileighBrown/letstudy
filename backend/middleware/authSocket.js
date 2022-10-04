//validaition, jwt token must be valid. If any user connected to our socket which is in socket server 

const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = (socket, next) => {

    const token = socket.handshake.auth?.token;

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY); //from token youll get user deatails from socket.user value
        socket.user = decoded;
    } catch (err) {
    const socketError = new Error('Not authorized');
    return next(socketError);
    }

    next();
}

module.exports = verifyTokenSocket