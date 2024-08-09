import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footerbar from './components/footerbar';
import Cards from './widgets_pagos/card_usuario';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ModalAvisos from '../../Utils/ModalAvisos';
import AlertDialog from '../../Utils/DialogAvisos';

const Pagos = () => {
	const apiUrl = process.env.REACT_APP_API_URL;
	//   const apiUrl = 'https://backend.salvajelife-fitness.online'
	const [inputCi, setValueCi] = useState();
	const [infosocio, setInfosocio] = useState();
	const [infopago, setInfopago] = useState();
	const [infoingresos, setInfoingresos] = useState();
	const [loading, setLoading] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [titulo] = useState();
	const [mensaje, setMensaje] = useState();
	const [diasDeCuota, setdiasDeCuota] = useState();
	const [openDialogAviso, setOpenDialogAviso] = useState(false);
	const [tipoNotificacion, setTipoNotificacion] = useState();
	const [mensajeNotificacion, setMensajeNotificacion] = useState();
	const [respuesta, setRespuesta] = useState();
	const [modalAvisos, setModalAvisos] = useState(false);
	const [refresh, setRefresh] = useState({});
	const handleNotificacion = (tipo, mensaje) => {
		setTipoNotificacion(tipo);
		setMensajeNotificacion(mensaje);
		setModalShow(false);
		setModalAvisos(true);
	};
	const handleHTTPGetUsuario = (inputCi) => {
		fetch(apiUrl + '/api/Usuarios/' + inputCi, {
			method: 'GET',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error en la solicitud');
				}
				return response.json();
			})
			.then((data) => {
				// Manipula los datos de respuesta
				if (Object.keys(data).length === 0) {
					console.log('no');
					return handleNotificacion('Aviso', 'Usuario no existe');
				}
				setInfosocio(data);
				console.log(data);
			})
			.catch((error) => {
				// Maneja cualquier error de la solicitud
				console.error(error);
			});
	};
	const handleHTTPGetIngresos = (inputCi) => {
		fetch(apiUrl + '/api/Ingresos/' + inputCi, {
			method: 'GET',
		})
			.then((response) => {
				//  if (!response.ok) {
				//    throw new Error('Error en la solicitud');
				//  }
				return response.json();
			})
			.then((data) => {
				// Manipula los datos de respuesta
				console.log('data de ignresos', data);
				setInfoingresos(data);
			})
			.catch((error) => {
				// Maneja cualquier error de la solicitud
				console.error(error);
			});
	};
	const handleHTTPGetCuotas = (inputCi) => {
		fetch(apiUrl + '/api/Cuotas/' + inputCi, {
			method: 'GET',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error en la solicitud');
				}
				return response.json();
			})
			.then((data) => {
				// Manipula los datos de respuesta
				console.log('data de cuotas', data);
				setInfopago(data);
			})
			.catch((error) => {
				// Maneja cualquier error de la solicitud
				console.error(error);
			});
	};
	const handleHTTPGetDiasDeCuota = (inputCi) => {
		var data = { ci: parseInt(inputCi) };

		fetch(apiUrl + '/api/Ingresos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Error en la solicitud');
				}
				return response.json();
			})
			.then((data) => {
				// Manipula los datos de respuesta
				console.log('data de dias de cuota', data);
				data ? setdiasDeCuota(data.diasDeCuota) : setdiasDeCuota(false);
				setdiasDeCuota(data.DiasDeCuota);
				console.log(data.DiasDeCuota);
			})
			.catch((error) => {
				// Maneja cualquier error de la solicitud
				console.error(error);
			});
	};
	const handleHTTPGetInformacionCompleta = (inputCi) => {
		handleHTTPGetUsuario(inputCi);
		handleHTTPGetIngresos(inputCi);
		handleHTTPGetDiasDeCuota(inputCi);
		handleHTTPGetCuotas(inputCi);
	};

	const handleInputChange = (event) => {
		setValueCi(event.target.value);
	};

	//Vuelve a realizar la peticion porque se registro la cuota del usuario
	useEffect(() => {
		console.log(refresh);
		setLoading(true);
		if (refresh.estado) {
			handleHTTPGetInformacionCompleta(refresh.ci);
			setMensaje('Se reigstra la cuota');
			setOpenDialogAviso(true);
		}
	}, [refresh]);

	return (
		<>
			<div className='home'>
				<div className='row'>
					<div className='col-12 bg-dark'>
						<Navbar />
					</div>
					<div className='col-2 text-bg-dark'>
						<Sidebar />
					</div>
					<div className='col-10'>
						<div className='py-2 d-flex justify-content-start'>
							<div className='input-group w-25'>
								<input
									type='text'
									className='form-control me-2'
									placeholder='Ingresar CI de Socio'
									onChange={handleInputChange}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											handleHTTPGetInformacionCompleta(event.target.value);
										}
									}}
								/>
								<button
									onClick={() => handleHTTPGetInformacionCompleta(inputCi)}
									className='btn btn-primary'
								>
									Cargar Datos
								</button>
								{/* <button onClick={() => handleHTTPGetInformacionCompleta(inputCi)} className='btn btn-primary'>Cargar Datos</button> */}
							</div>
						</div>
						<div>
							<ModalAvisos
								show={modalShow}
								onHide={() => setModalShow(false)}
								titulo={titulo}
								mensaje={mensaje}
							/>
							<Cards
								infoingresos={infoingresos}
								infopago={infopago}
								infosocio={infosocio}
								diasDeCuota={diasDeCuota}
								setRefresh={setRefresh}
								refresh={refresh}
							/>
						</div>
					</div>
					<div className='col-12 footer text-bg-dark'>
						<Footerbar />
					</div>
				</div>
				<ModalAvisos
					show={modalAvisos}
					onHide={() => setModalAvisos(false)}
					tipo={tipoNotificacion}
					mensaje={mensajeNotificacion}
					respuesta={respuesta}
					setRespuesta={setRespuesta}
				/>
			</div>
			<AlertDialog
				open={openDialogAviso}
				onHide={() => {
					setOpenDialogAviso(false);
				}}
				mensaje={mensaje}
			/>
			{loading && <Spinner />}
		</>
	);
};

export default Pagos;
