import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const BoxWrapper = styled('div')({
    width: '100%',
    height:'100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    background: 'repeating-linear-gradient(white, white 25px, #9198e5 26px,#9198e5 27px)',
    backgroundSize: 'cover',
})

const AuthBox = (props) => {
  return (
    <div>
        <BoxWrapper>
            <Box
            sx={{
                width: '700px',
                height:'400px',
                bgcolor: '#f0e9a0',
                borderRadius:'5px',
                boxShadow:'0 10px 10px 2px rgba(0,0,0,0.3)', 
                display: 'flex',
                flexDirection:'column',
                padding: '25px'

            }}
            >
                {props.children}
            </Box>
        </BoxWrapper>
    </div>
  )
}

export default AuthBox