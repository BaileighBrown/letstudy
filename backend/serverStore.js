const connectedUsers = new Map();

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId });
    console.log("new connected users");
    console.log(connectedUsers);
  };

  const removeConnectedUsers = (socketId) => {
    if(connectedUsers.has(socketId)){
        connectedUsers.delete(socketId);
        console.log("new connected users ");
        console.log(connectedUsers);
    }
  }

const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach(function(value, key){
    if (value.userId === userId){
      activeConnections.push(key)
    }
  });
  return activeConnections;
}

//telling users if someone is online
const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

module.exports = {
    addNewConnectedUser,
    removeConnectedUsers,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
}