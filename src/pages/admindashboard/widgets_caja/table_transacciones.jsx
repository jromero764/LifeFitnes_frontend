import { useState, useEffect, Fragment } from 'react';
import NewVentaModal from './modal_venta';
import NewCompraModal from './modal_compra';
import ModalAvisos from '../../../Utils/ModalAvisos';
import {
	eliminarTransaccionHTTP,
	obtenerTransaccionesHTTP,
} from '../../../apiRest/TransaccionesHTTP';
import * as FileSaver from 'file-saver';
import ModalConfirmationV2 from '../../../Utils/ModalConfirmationV2';
import AlertDialog from '../../../Utils/DialogAvisos';
import XLSX from 'sheetjs-style';

const TransactionTable = () => {
	//-------------------------------------------------------------------INICIO DE VARIABLES------------------------------------------------------------------->
	// const apiUrl = process.env.REACT_APP_API_URL;
	//   const apiUrl = 'https://backend.salvajelife-fitness.online'
	const [ventas, setVentas] = useState([]);
	const [ventasDelDia, setVentasDelDia] = useState();
	const [compras, setCompras] = useState([]);
	const [comprasDelDia, setComprasDelDia] = useState();
	const [fecha, setFecha] = useState(currentdate);
	const [modalVentaShow, setModalVentaShow] = useState();
	const [modalCompraShow, setModalCompraShow] = useState();
	const [tipoNotificacion, setTipoNotificacion] = useState();
	const [mensajeNotificacion, setMensajeNotificacion] = useState();
	const [modalAvisos, setModalAvisos] = useState(false);
	const [respuesta, setRespuesta] = useState();
	const [id, setId] = useState();
	const [valueOption, setValueOption] = useState(true);
	const [excelData, setExcelData] = useState();
	const [show, setShow] = useState(false);
	const [flag, setFlag] = useState(false);
	const [mensaje, setMensaje] = useState(false);
	const [openDialogAviso, setOpenDialogAviso] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	var date = new Date(); //Fecha actual
	var mes = date.getMonth() + 1; //obteniendo mes
	var dia = date.getDate(); //obteniendo dia
	var ano = date.getFullYear(); //obteniendo año
	if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10
	if (mes < 10) mes = '0' + mes; //agrega cero si el menor de 10
	var currentdate = ano + '-' + mes + '-' + dia;
	//-------------------------------------------------------------------DECLARACION DE METODOS------------------------------------------------------------------->

	/* const handleGETALL = (fecha) => {
        setFecha(fecha);
        { valueOption ? handleGetHTTPVentas(fecha) : console.log('funca') }
        handleGetHTTPComprasDelDia(fecha);
        handleGetHTTPVentasDelDia(fecha);
        console.log(ventas);
    } */

	const handleGETALL = (fecha) => {
		setFecha(fecha);

		if (valueOption) {
			handleGetHTTPVentas(fecha);
		} else {
			console.log('funca');
		}

		handleGetHTTPComprasDelDia(fecha);
		handleGetHTTPVentasDelDia(fecha);

		console.log(ventas);
	};

	const handleGetHTTPVentas = async (fecha) => {
		try {
			let response = await obtenerTransaccionesHTTP('Venta', fecha);
			if (response.data && response.data.length > 0) {
				setVentas(response.data);
			}
			console.log('respuesta', response);
		} catch (error) {
			console.log('hubo un error', error);
		}
	};
	const handleGetHTTPVentasDelDia = async (fecha) => {
		try {
			let response = await obtenerTransaccionesHTTP('VentasDelDia', fecha);
			if (response.data && response.data.length > 0) {
				setVentasDelDia(response.data);
			}
			console.log('respuesta', response);
		} catch (error) {
			console.log('hubo un error', error);
		}
	};
	const handleGetHTTPCompras = async (fecha) => {
		try {
			let response = await obtenerTransaccionesHTTP('Compra', fecha);
			if (response.data && response.data.length > 0) {
				setCompras(response.data);
			}
			console.log('respuesta', response);
		} catch (error) {
			console.log('hubo un error', error);
		}
	};
	const handleGetHTTPComprasDelDia = async (fecha) => {
		try {
			let response = await obtenerTransaccionesHTTP('ComprasDelDia', fecha);
			if (response.data && response.data.length > 0) {
				setComprasDelDia(response.data);
			}
			console.log('respuesta', response);
		} catch (error) {
			console.log('hubo un error', error);
		}
	};
	const handleDelete = (id) => {
		console.log(id);
		setShow(true);
		setId(id);
	};
	const handleNotificacion = (tipo, mensaje, id) => {
		setTipoNotificacion(tipo);
		setMensajeNotificacion(mensaje);
		setModalAvisos(true);
		setId(id);
	};

	const ExportarExcel = () => {
		const ws = XLSX.utils.json_to_sheet(ventas);
		const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, 'Ventas' + fileExtension);
	};
	const handleRefresh = () => {
		setRefresh(true);
	};
	console.log(compras);
	//-------------------------------------------------------------------LOGICA DEL COMPONENTE------------------------------------------------------------------->

	useEffect(() => {
		handleGetHTTPVentas(currentdate);
		handleGetHTTPVentasDelDia(currentdate);
		handleGetHTTPCompras(currentdate);
		handleGetHTTPComprasDelDia(currentdate);
	}, []);

	useEffect(() => {
		if (respuesta === 'true') {
			handleDelete(id);
		}
	}, [respuesta]);
	useEffect(() => {
		const fetchData = async () => {
			console.log('flag', flag);
			if (flag) {
				try {
					let response = await eliminarTransaccionHTTP(id);
					setOpenDialogAviso(true);
					setMensaje(response.data.respuesta);
				} catch (error) {
					// Maneja el error si es necesario
				} finally {
					setShow(false);
					setFlag(false);
				}
			}
		};

		fetchData();
	}, [flag]);
	useEffect(() => {
		if (refresh) {
			handleGetHTTPVentas(currentdate);
			handleGetHTTPVentasDelDia(currentdate);
			handleGetHTTPCompras(currentdate);
			handleGetHTTPComprasDelDia(currentdate);
		}
	}, [refresh]);

	return (
		<Fragment>
			<div className='mt-2 row'>
				<div className='col-6'>
					<div className='d-flex justify-content-start'>
						<h2 className='border border-radius-5'>
							FECHA SELECCIONADA: {fecha ?? currentdate}
						</h2>
					</div>
				</div>
				<div className='col-6'>
					<div className='d-flex justify-content-end'>
						<div className='input-group w-25 me-3'>
							<input
								type='date'
								className='form-control'
								onChange={(event) => handleGETALL(event.target.value)}
								defaultValue={currentdate}
							/>
						</div>
						<div className='input-group w-25 me-3'>
							<select
								className='form-select'
								onChange={(event) => setValueOption(event.target.value)}
							>
								<option>Filtrar por</option>
								<option value={true}>Ventas del Día</option>
								<option value={''}>Compras del Día</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-6'>
					<div className='py-3'>
						<div className='card border-success'>
							<div className='text-white card-header bg-success'>
								Ventas del día
							</div>

							<div className='card-body'>
								<h2 className='card-body'>${ventasDelDia ?? '0'}</h2>
							</div>
						</div>
					</div>
					<div className='row justify-content-end'>
						<div className='col-3'>
							<button
								className='btn btn-outline-success'
								onClick={() => setModalVentaShow(true)}
							>
								{' '}
								+ Nueva Venta{' '}
							</button>
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='py-3'>
						<div className='card border-danger'>
							<div className='text-white card-header bg-danger'>
								Compras del día
							</div>
							<div className='card-body'>
								<h2 className='card-body'>${comprasDelDia ?? '0'}</h2>
							</div>
						</div>
					</div>

					<div className='d-flex justify-content-end'>
						<button
							className='btn btn-outline-danger'
							onClick={() => setModalCompraShow(true)}
						>
							{' '}
							+ Nueva Compra{' '}
						</button>
					</div>
				</div>
			</div>

			<br />

			<div className='row'>
				<div className='mt-2 mb-2 border row'></div>
				<div className='row'>
					{valueOption ? (
						//---------------------------------------------------------------------------------TABLA PARA LAS VENTAS --------------------------------------------------------------------------------->
						<Fragment>
							<div className='row'>
								<div className='d-flex justify-content-start col'>
									<h2 className='mt-2'>Ventas del día</h2>
								</div>
								<div className='d-flex justify-content-end col'>
									<input
										onClick={() => {
											ExportarExcel();
										}}
										type='button'
										value='Exportar'
										className='btn btn-success'
									/>
								</div>
							</div>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th>ID</th>
										<th>Producto</th>
										<th>Vendedor</th>
										<th>Cedula</th>
										<th>Cliente</th>
										<th>Hora Transaccion</th>
										<th>Precio Venta</th>
										<th>Gestion</th>
									</tr>
								</thead>
								<tbody>
									{ventas.map((venta) => (
										<tr key={venta.id}>
											<th scope='row'>{venta.id}</th>
											<th>{venta.producto.Nombre}</th>
											<th>
												{venta.administrador
													? venta.administrador.usuarios.Nombre
													: ''}
											</th>
											<th>{venta.cliente ? venta.cliente.usuario.ci : ''}</th>
											<th>
												{venta.cliente ? venta.cliente.usuario.Nombre : ''}{' '}
												{venta.cliente ? venta.cliente.usuario.Apellido : ''}
											</th>
											<th>{venta.HoraTransaccion}</th>
											<th>{venta.producto.PrecioVenta}</th>
											<th>
												<button
													onClick={() => handleDelete(venta.id)}
													className='mx-2 btn btn-outline-danger'
												>
													<i className='bi bi-trash'> </i>
												</button>
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</Fragment>
					) : (
						//---------------------------------------------------------------------------------TABLA PARA LAS COMPRAS --------------------------------------------------------------------------------->
						<Fragment>
							<div className='row'>
								<div className='d-flex justify-content-start'>
									<h2 className='mt-2'>Compras del día</h2>
								</div>
							</div>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th>ID</th>
										<th>Producto</th>
										<th>Comprador</th>
										<th>Cedula</th>
										<th>Cliente</th>
										<th>Hora Transaccion</th>
										<th>Precio Compra</th>
										<th>Gestion</th>
									</tr>
								</thead>
								<tbody>
									{compras.map((compra) => (
										<tr key={compra.id}>
											<th scope='row'>{compra.id}</th>
											<th>{compra.Producto}</th>
											<th>{compra.Vendedor}</th>
											<th>{compra.CI}</th>
											<th>
												{compra.Nombre} {compra.Apellido}
											</th>
											<th>{compra.HoraTransaccion}</th>
											<th>{compra.Precio}</th>
											<th>
												<button
													onClick={() =>
														handleNotificacion(
															'Confirmacion',
															'Desea Eliminar la Transaccion',
															compra.id
														)
													}
													className='mx-2 btn btn-outline-danger'
												>
													<i className='bi bi-trash'> </i>
												</button>
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</Fragment>
					)}
				</div>
			</div>

			{/* -------------------------------------------------------------------MODALES-----------------------------------------------------------------------------------------------------------> */}
			<ModalAvisos
				show={modalAvisos}
				onHide={() => setModalAvisos(false)}
				tipo={tipoNotificacion}
				mensaje={mensajeNotificacion}
				respuesta={respuesta}
				setRespuesta={setRespuesta}
			/>
			<NewVentaModal
				show={modalVentaShow}
				onHide={() => setModalVentaShow(false)}
				refresh={handleRefresh}
			/>
			<NewCompraModal
				show={modalCompraShow}
				onHide={() => setModalCompraShow(false)}
			/>
			<ModalConfirmationV2
				show={show}
				setShow={setShow}
				setFlag={setFlag}
			/>
			<AlertDialog
				open={openDialogAviso}
				onHide={() => {
					setOpenDialogAviso(false);
				}}
				mensaje={mensaje}
			/>
		</Fragment>
	);
};
export default TransactionTable;
