import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { changePassword } from '../apiRest/UsuariosHTTP';
import { Alert, CircularProgress } from '@mui/material';

// import Cookies from 'js-cookie';
const ModalChangePassword = (props) => {
	const [valuePassword, setValuePassword] = useState('');
	const [valuePassword2, setValuePassword2] = useState('');
	const [mensaje, setMensaje] = useState();
	const [respuesta, setRespuesta] = useState();
	const [loading, setLoading] = useState(false);

	const HandleChangePassword = async () => {
		if (valuePassword === '' || valuePassword2 === '') {
			setRespuesta('error');
			return setMensaje('Los campos no pueden quedar vacios');
		}
		if (valuePassword !== valuePassword2) {
			setRespuesta('error');
			return setMensaje('Las contraseñas no coinciden');
		}
		const data = {
			id_administrador: localStorage.getItem('idAdministrador'),
			password: valuePassword,
		};
		setLoading(true);
		try {
			let response = await changePassword(data);
			setRespuesta('success');
			setMensaje(response.data.respuesta);
		} catch (error) {
			console.log('hubo un error', error);
		} finally {
			setLoading(false);
		}
	};
	const handleCloseModal = () => {
		setRespuesta(null);
		setMensaje(null);
		props.onHide();
	};
	useEffect(() => {
		setRespuesta(null);
		setLoading(false);
		setValuePassword('');
		setValuePassword2('');
	}, []);
	return (
		<Modal
			{...props}
			size='xl'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header
				onClick={handleCloseModal}
				closeButton
			>
				<Modal.Title id='contained-modal-title-vcenter'>
					<h3>Cambio de Contraseña</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='mb-2 col-2'>
					<label htmlFor='floatingInputValue'>Nueva Contraseña</label>
					<input
						type='text'
						className='form-control'
						id='floatingInputValue'
						onChange={(event) => setValuePassword(event.target.value)}
					/>
				</div>
				<div className='mb-2 col-2'>
					<label htmlFor='floatingInputValue'>Repita Contraseña</label>
					<input
						type='text'
						className='form-control'
						id='floatingInputValue'
						onChange={(event) => setValuePassword2(event.target.value)}
					/>
				</div>
				{respuesta == 'success' && (
					<div className='col-3 ms-3 text-success'>
						<Alert severity='success'>{mensaje}</Alert>
					</div>
				)}
				{respuesta == 'error' && (
					<div className='col-3 ms-3 text-danger'>
						<Alert severity='error'>{mensaje}</Alert>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='primary'
					onClick={() => {
						HandleChangePassword();
					}}
				>
					Cambiar
				</Button>
				<Button
					variant='secondary'
					onClick={handleCloseModal}
				>
					Cancelar
				</Button>
			</Modal.Footer>
			{loading && <CircularProgress />}
		</Modal>
	);
};

export default ModalChangePassword;
