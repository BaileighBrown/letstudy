import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  //setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";

let socket = null;

//responsible for connection of socket.io server 
export const connectWithSocketServer = (userDetails) => {
    const jwtToken = userDetails.token;

    socket = io('http://localhost:5002', { 
        auth:{
            token: jwtToken,

        },
    });

    socket.on('connect', () =>{
        console.log('successfully connected with socket server');
        console.log(socket.id);
    });

    socket.on('friends-invitations', (data) =>{

    const { pendingInvitations } = data;
    
    store.dispatch(setPendingFriendsInvitations(pendingInvitations))

    }); 

    socket.on('friends-list', (data) =>{
        const { friends } = data;
        store.dispatch(setFriends(friends))
    })
};

