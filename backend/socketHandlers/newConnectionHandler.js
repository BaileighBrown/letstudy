const serverStore = require ('../serverStore')
const friendsUpdate = require('../socketHandlers/updates/friends')

const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({ //passing information to add for new user 
        socketId: socket.id,
        userId: userDetails.userId,
    });


//update pending invitation list
friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

}

module.exports = newConnectionHandler;