import React from 'react'
import { styled } from '@mui/system'
import AddFriendButton from './AddFriendButton'
import Pomodoro from '../Pomodoro/Pomodoro'
import FriendsTitle from './FriendsTitle'
import FriendsList from './FriendsList/FriendsList'
import PendingInvitationsList from './PendingInvitationList/PendingInvitationsList'

const MainContainer = styled('div')({
    width: '224px',
    height:'100%', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F6EEE3',

})
const FriendsSideBar = () => {
  return (
    <MainContainer>
    <AddFriendButton /> 
    <FriendsTitle title='Private Messages' />
    <FriendsList />
    <FriendsTitle title='Invitations' />
    <PendingInvitationsList />
    <Pomodoro />
    </MainContainer>
  )
}

export default FriendsSideBar