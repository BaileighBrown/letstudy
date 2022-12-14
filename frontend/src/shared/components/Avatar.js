import styled from '@emotion/styled'
import React from 'react'

const AvatarPreview = styled('div')({
    height: '42px',
    width: '42px',
    backgroundColor:'#c4a484',
    borderRadius:'42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'20px',
    fontWeight:'700',
    color:'#fff'

})

const Avatar = ({username, large}) => {
  return (
    <AvatarPreview style={large ? { height:'80px', width:'80px'} : {}}>
        {username.substring(0,2)}
    </AvatarPreview>
  )
}

export default Avatar