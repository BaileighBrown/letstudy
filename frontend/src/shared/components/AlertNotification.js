import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { connect } from "react-redux"; 

const AlertNotification = (props) => {
  return (
    <div>
        <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open
        onClose={() => {}}
       // autoHideDuration={6000}
        
        >
            <Alert severity="info">ALERT MESSAGE</Alert>
        </Snackbar>
    </div>
  )
}

export default AlertNotification