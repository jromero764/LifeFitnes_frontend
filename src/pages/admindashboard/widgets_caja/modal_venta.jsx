import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import ModalAvisos from '../../../Utils/ModalAvisos';
const NewVentaModal = (props) =>{
//-------------------------------------------------------------------INICIO DE VARIABLES------------------------------------------------------------------->    
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = apiUrl+'/api/Productos/0';
    const [cantidadProducto,setCantidadProducto] = useState();
    const [selectProducto,setselectProducto] = useState();
    const [valueOption, setValueOption] = useState();
    const [opciones, setOpciones] = useState([]);
    const [ci, setci] = useState(Cookies.get('Sesion'));
    const [tipoNotificacion, setTipoNotificacion] = useState(); 
    const [mensajeNotificacion, setMensajeNotificacion] = useState(); 
    const [modalAvisos, setModalAvisos] = useState(false);
    const [respuesta, setRespuesta] = useState();
    const [id, setId] = useState();

//-------------------------------------------------------------------DECLARACION DE METODOS------------------------------------------------------------------->
const handleGetHTTPProductos = async() =>{ 
    const response =  fetch (url,{
        method:'GET',
        headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        setOpciones(response.data);
    });
}
const handleRegister = () => {
    const data = {
        ci: ci,
        productos_id:valueOption,
        socios_ci:12345678,
        TipoDeTransaccion:'Venta'
      };
      fetch(apiUrl+'/api/Transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then(data => {
          // Manipula los datos de respuesta
          handleNotificacion('Aviso',data.respuesta,'');
          console.log(data);
        })
        .catch(error => {
          // Maneja cualquier error de la solicitud
          console.error(error);
        });
    
  };
  const handleUpdateStock = () => {
    
       const productos_id=valueOption;
       const cantidad=1;
      
      fetch(apiUrl+'/api/Stock/'+productos_id+'/'+cantidad, {
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
          if(data==1){handleRegister()}
          handleNotificacion('aviso',data,'');
        })
        .catch(error => {
          // Maneja cualquier error de la solicitud
          console.error(error);
        });
    
  };
  const handleNotificacion=(tipo,mensaje,id)=>{
    setTipoNotificacion(tipo);
    setMensajeNotificacion(mensaje);
    setModalAvisos(true);
    setId(id);     
}
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
    
                </form>
            </Modal.Body>
            <Modal.Footer>
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