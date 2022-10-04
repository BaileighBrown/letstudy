const serverStore = require ('../serverStore');

const disconnectHandler = (socket) => {
    serverStore.removeConnectedUsers(socket.id);
};

module.exports = disconnectHandler;