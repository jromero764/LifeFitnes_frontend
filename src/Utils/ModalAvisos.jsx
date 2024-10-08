import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const ModalAvisos = (props) => {
	//VARIABLES QUE NECESITO PARA QUE FUNCIONE
	const [tipoNotificacion, setTipoNotificacion] = useState(); //LA NOTIFICACION PUEDE SER AVISO O NTOFICACION
	// const [mensajeNotificacion, setMensajeNotificacion] = useState(); //MENSAJE QUE QUIERO QUE APAREZCA
	// const [respuesta, setRespuesta] = useState();
	const [setModalAvisos] = useState(false);

	//METODO PARA UTILIZAR LAS NOTIFICACIONES
	// const handleNotificacion = (tipo, mensaje) => {
	// 	setTipoNotificacion(tipo);
	// 	setMensajeNotificacion(mensaje);
	// 	// setModalShow(false);
	// 	setModalAvisos(true);
	// };

	// const apiUrl = process.env.REACT_APP_API_URL;

	if (props.tipo === 'Confirmacion') {
		setTipoNotificacion(true);
	}

	const handleResponse = () => {
		setModalAvisos(false);
		// props.setRespuesta('true');
	};

	return (
		<Modal
			{...props}
			size='xl'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{tipoNotificacion ? <h2>CONFIRMACION</h2> : <h2>AVISO</h2>}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.mensaje}</Modal.Body>
			<Modal.Footer>
				{tipoNotificacion ? (
					<div>
						<Button
							onClick={() => handleResponse()}
							className='text-white me-3'
							variant='warning'
						>
							{' '}
							Confirmar{' '}
						</Button>
						<Button
							variant='secondary'
							onClick={props.onHide}
						>
							Cancelar
						</Button>
					</div>
				) : (
					<Button onClick={props.onAction}>Close</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAvisos;
