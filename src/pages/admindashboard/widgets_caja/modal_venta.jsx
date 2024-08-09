import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Grid, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ModalAvisos from '../../../Utils/ModalAvisos';
import { registrarNuevaTransaccion } from '../../../apiRest/TransaccionesHTTP';
const NewVentaModal = (props) => {
  //-------------------------------------------------------------------INICIO DE VARIABLES------------------------------------------------------------------->    
  const apiUrl = process.env.REACT_APP_API_URL;
//   const apiUrl = 'https://backend.salvajelife-fitness.online'
  const url = apiUrl + '/api/Productos/0';
  const [cantidadProducto, setCantidadProducto] = useState();
  const [selectProducto, setselectProducto] = useState();
  const [valueOption, setValueOption] = useState();
  const [opciones, setOpciones] = useState([]);
  const [ci, setci] = useState(Cookies.get('Sesion'));
  const [cedulaCliente, setCedulaCliente] = useState('')
  const [tipoNotificacion, setTipoNotificacion] = useState();
  const [mensajeNotificacion, setMensajeNotificacion] = useState();
  const [modalAvisos, setModalAvisos] = useState(false);
  const [respuesta, setRespuesta] = useState();
  const [id, setId] = useState();
  const [alert, setAlert] = useState(false)
  //-------------------------------------------------------------------DECLARACION DE METODOS------------------------------------------------------------------->
  const handleGetHTTPProductos = async () => {
    const response = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        setOpciones(response.data);
      });
  }
  
  const handleRegister = async () => {

    const data = {
      ci: ci,
      id_clientes: cedulaCliente,
      id_administrador: localStorage.getItem('idAdministrador'),
      productos_id: valueOption,
      TipoDeTransaccion: 'Venta'
    };
    try {
      let response = await registrarNuevaTransaccion(data)
      handleNotificacion('success');
    } catch (error) {
      handleNotificacion('error');
    }

  };
  const handleNotificacion = (option) => {
    if (option == 'success') {
      setAlert(option)
    } else {
      setAlert(option)
    }
    setTimeout(() => {
      setAlert(false)
      props.refresh()
      props.onHide()
    }, 2500)
  }
  const handleUpdateStock = () => {

    const productos_id = valueOption;
    const cantidad = 1;

    fetch(apiUrl + '/api/Stock/' + productos_id + '/' + cantidad, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Manipula los datos de respuesta
        if (data == 1) { handleRegister() }
        handleNotificacion('success');
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });

  };
  // const handleNotificacion = (tipo, mensaje, id) => {
  //   setTipoNotificacion(tipo);
  //   setMensajeNotificacion(mensaje);
  //   setModalAvisos(true);
  //   setId(id);
  // }
  //-------------------------------------------------------------------LOGICA DEL COMPONENTE------------------------------------------------------------------->
  useEffect(() => {
    handleGetHTTPProductos();

  }, [])

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          REGISTRAR VENTA
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='row mb-3'>
          {/* <div className='col-3 mb-2'>
                        <label htmlFor="floatingInputValue1">Cantidad: </label>
                        <input type="number" className="form-control" id="floatingInputValue1" placeholder='ej: Pepito' onChange={(event) => setCantidadProducto(event.target.value)}/>
                    </div> */}
          <div className='col-9 mb-2'>
            <label htmlFor="floatingInputValue2">Producto:</label>
            <select className='form-select' onChange={(event) => setValueOption(event.target.value)}>
              <option value={null}>Seleccione el producto</option>
              {opciones.map((opcion, index) => (

                <option key={opcion.id} value={opcion.id}>
                  {opcion.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className='col-9 mb-2'>
            <label htmlFor="floatingInputValue1">Opcional Cedula Cliente: </label>
            <input type="text" className="form-control" id="floatingInputValue1" onChange={(event) => setCedulaCliente(event.target.value)} />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Grid>
          {alert == 'success' && (
            <Alert severity="success">
              Se registra la venta
            </Alert >
          )
          }
          {alert == 'error' && (<Alert severity="warning">
            Hubo un error
          </Alert>)
          }

        </Grid>
        <Button variant="success" onClick={() => handleUpdateStock()}> + Nueva Venta </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <ModalAvisos
        show={modalAvisos}
        onHide={() => setModalAvisos(false)}
        tipo={tipoNotificacion}
        mensaje={mensajeNotificacion}
        respuesta={respuesta}
        setRespuesta={setRespuesta}
      />
    </Modal>

  )
}

export default NewVentaModal