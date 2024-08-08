import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { deleteUser } from '../apiRest/UsuariosHTTP';
import { handleGetUser } from '../pages/admindashboard/widgets_socios/UserContainer';
import ModalConfirmacion from './ModalConfirmacion';

// import setModalDelete from '../pages/admindashboard';
// import React, { useState } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalConfirmationV2({ show, setFlag, setShow }) {

  const handleClose = () => {
    setShow(false)
  }
  const handleClick = () => {
    setFlag(true)
  }
  return (
    <>
      {/* delete alert confirmation ---------------------------------------------------------------------------- */}
      <React.Fragment>
        {/* <Button variant="outlined" onClick={handleClose}>
        Open dialog
      </Button> */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={show}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Aviso
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              ¿Seguro que desea eliminar?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus sx={{ background: '#d00000', color: 'white', '&:hover': { backgroundColor: 'darkred' } }} onClick={handleClick}>
              Eliminar
            </Button>
            <Button autoFocus sx={{ background: '#023e8a', color: 'white', '&:hover': { backgroundColor: '#023047' } }} onClick={handleClose}>
              No
            </Button>
          </DialogActions>
        </BootstrapDialog>

      </React.Fragment>

    </>
  );
}
