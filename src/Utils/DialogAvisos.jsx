import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
export default function AlertDialog({ open, onHide, mensaje }) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onHide}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Alert severity="info">NOTIFICACION</Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensaje}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHide}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}