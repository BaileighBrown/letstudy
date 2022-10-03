import React from 'react'
import { styled } from '@mui/system'
import PendingInvitationsListItem from './PendingInvitationsListItem'


const DUMMY_INVITATIONS = [
  {
_id:'1',
senderId:{
  username: 'Sean',
  mail:'dummy@ad.com'
  }
},
{
  _id:'2',
  senderId:{
    username: 'Jade',
    mail:'Jade@ad.com'
    }
  },
  {
    _id:'3',
    senderId:{
      username: 'Chris',
      mail:'Chris@ad.com'
    }
    
    }

]
const MainContainer = styled('div')({
    height:'22%',
    width:"100%",
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    overflow: 'auto',
})

const PendingInvitationsList = () => {
  return (
    <MainContainer>
{DUMMY_INVITATIONS.map(invitation =>(
  <PendingInvitationsListItem 
  key={invitation._id}
  id={invitation._id}
  username={invitation.senderId.username}
  email={invitation.senderId.mail}
  />
))}
    </MainContainer>
  )
}

export default PendingInvitationsList