const User = require('../../models/user')
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // check if frient that we would like to invite is not user or
    if(mail.toLowerCase() === targetMailAddress.toLowerCase()){
        return res
        .status(409)
        .send('sorry. you cannot become friends with yourself')
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase(),
    });

    if (!targetUser){
        return res.status(404).send(`friend of ${targetMailAddress}
         has not been found. please check mail address`);
    }

   // check if invitation has been already sent
   const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id, // getting id from database 
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

    // check if the user whuch we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invite in database and saves it 
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });
// if invtiation has been successfully created we would like to update friends invitations if other user is online

//send pending invitations update to specic userId
friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString())

  //friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");

}; 

module.exports = postInvite;