import * as React from 'react';
import { useState,useEffect } from 'react';
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

export default function ModalDelete({show, data, setModalDelete, setFlagDelete}) {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(show);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [tipoNotificacion, setTipoNotificacion] = useState();
  const [mensajeNotificacion, setMensajeNotificacion] = useState();
  const [modalAvisos, setModalAvisos] = useState(false);
const [dataRecibed, setDataRecibed] = useState({})
  const handleNotificacion = (tipo, mensaje) => {
    setTipoNotificacion(tipo);
    setMensajeNotificacion(mensaje);
    setModalAvisos(true);

  }

  const handleClose = () => {
    setModalDelete(false);
  };


  // const handleClose = () => {
  //   onClose(); // Call the onClose function passed as a prop
  // };
  const handleDelete = async () => {
    console.log('que recibe',data)    
    try {
      const response = await deleteUser(data.id);
      setFlagDelete(true)
      console.log('La respuesta es:', response);
      handleNotificacion('Aviso', response.data.respuesta);
    } catch (error) {
      console.log(`Hubo un error ${error}`);
    }

  };

  const handleDeleteClick = () => {
    handleDelete();
    handleClose();
  };

  return (
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
            ¿Seguro que desea eliminar este usuario?
          </Typography>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ background: '#d00000', color: 'white', '&:hover': {backgroundColor: 'darkred'} }} onClick={handleDeleteClick}>
            Eliminar
          </Button>
          <Button autoFocus sx={{ background: '#023e8a', color: 'white', '&:hover': {backgroundColor: '#023047'} }} onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
