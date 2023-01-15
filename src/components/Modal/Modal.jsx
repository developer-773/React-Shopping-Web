import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({children, modal,title,  setModal}) => {
  return (
    <Box sx={{width: "100%", maxWidth: "666px"}}>
      <Dialog
        onClose={() => setModal(false)}
        open={modal}
      >
        <DialogTitle id="customized-dialog-title" >
         {title}
        </DialogTitle>
     {children}
      </Dialog>
    </Box>
  )
}

export default Modal