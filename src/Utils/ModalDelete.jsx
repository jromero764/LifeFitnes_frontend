import * as React from 'react';
import { useState } from 'react';
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
import ModalConfirmacion from './ModalConfirmacion';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export default function ModalDelete({
	show,
	data,
	setModalDelete,
	setFlagDelete,
}) {
	const [setTipoNotificacion] = useState();
	const [setMensajeNotificacion] = useState();
	const [setModalAvisos] = useState(false);
	const [DeleteConfirmed, setDeleteConfirmed] = useState(false);
	const [setModalShow] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const handleNotificacion = (tipo, mensaje) => {
		setTipoNotificacion(tipo);
		setMensajeNotificacion(mensaje);
		setModalAvisos(true);
		setShowConfirmationModal(true);
	};

	const handleClose = () => {
		setModalDelete(false);
	};

	const handleDelete = async () => {
		console.log('que recibe', data);
		try {
			const response = await deleteUser(data.id);
			setFlagDelete(true);
			console.log('La respuesta es:', response);
			handleNotificacion('Aviso', response.data.respuesta);
			setDeleteConfirmed(true);
		} catch (error) {
			console.log(`Hubo un error ${error}`);
		}
	};

	const handleDeleteClick = () => {
		handleDelete();
		handleClose();
		setModalShow(false);
	};

	return (
		<>
			{/* delete alert confirmation ---------------------------------------------------------------------------- */}
			<React.Fragment>
				<BootstrapDialog
					onClose={handleClose}
					aria-labelledby='customized-dialog-title'
					open={show}
				>
					<DialogTitle
						sx={{ m: 0, p: 2 }}
						id='customized-dialog-title'
					>
						Aviso
					</DialogTitle>
					<IconButton
						aria-label='close'
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
						<Typography gutterBottom>¿Seguro que desea eliminar?</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							autoFocus
							sx={{
								background: '#d00000',
								color: 'white',
								'&:hover': { backgroundColor: 'darkred' },
							}}
							onClick={handleDeleteClick}
						>
							Eliminar
						</Button>
						<Button
							autoFocus
							sx={{
								background: '#023e8a',
								color: 'white',
								'&:hover': { backgroundColor: '#023047' },
							}}
							onClick={handleClose}
						>
							No
						</Button>
					</DialogActions>
				</BootstrapDialog>
				{/* confirmacion de eliminacion----------------------------------------------------------------------- */}
			</React.Fragment>

			<ModalConfirmacion
				show={showConfirmationModal}
				setModalShow={setShowConfirmationModal}
				setModalDelete={setModalDelete}
				DeleteConfirmed={DeleteConfirmed}
				setDeleteConfirmed={setDeleteConfirmed}
			/>
		</>
	);
}
