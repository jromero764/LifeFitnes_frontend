import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState,useEffect} from 'react';
import ModalAvisos from '../../../Utils/ModalAvisos';

const NewProductModal = (props) =>{
//----------------------------------------------------SETEO DE VARIABLES------------------------------------------------------------->
   const apiUrl = process.env.REACT_APP_API_URL;
   const [inputName,setValueName] = useState();
   const [inputDescripcion,setDescripcion] = useState();
   const [inputPrecioCompra,setPrecioCompra] = useState();
   const [inputPrecioVenta,setPrecioVenta] = useState();
   const [inputStock, setStock] = useState();
   const [inputLote,setLote] = useState();
   const [inputFechaDeVencimiento,setFechaDeVencimiento] = useState();
   const [inputFechaDeIngreso,setFechaDeIngreso] = useState();
   const [modalAvisos, setModalAvisos] = useState(false);
   const [tipoNotificacion, setTipoNotificacion] = useState();
   const [mensajeNotificacion, setMensajeNotificacion] = useState();
   
//----------------------------------------------------METODOS DEL COMPONENTE------------------------------------------------------------->
   const handleRegister = () => {
    const data = {
        Nombre: inputName,
        Descripcion:inputDescripcion,
        PrecioCompra:inputPrecioCompra,
        PrecioVenta:inputPrecioVenta,
        Stock:inputStock,
        FechaIngreso:inputFechaDeIngreso,
        Lote:inputLote,
        FechaVencimiento:inputFechaDeVencimiento,
      };
      fetch(apiUrl+'/api/Productos', {
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
          console.log(data);
          handleNotificacion('Aviso',data.respuesta);
        })
        .catch(error => {
          // Maneja cualquier error de la solicitud
          console.error(error);
        });
        const handleNotificacion=(tipo,mensaje)=>{
            setTipoNotificacion(tipo);
            setMensajeNotificacion(mensaje);
            setModalAvisos(true);     
        }
  }; 
  const handleUpdate = (id) => {
    const data = {
        Nombre: inputName,
        Descripcion:inputDescripcion,
        PrecioCompra:inputPrecioCompra,
        PrecioVenta:inputPrecioVenta,
        Stock:inputStock,
        FechaIngreso:inputFechaDeIngreso,
        Lote:inputLote,
        FechaVencimiento:inputFechaDeVencimiento,
      };
      fetch(apiUrl+'/api/Productos/'+id, {
        method: 'PATCH',
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
          console.log(data);
          handleNotificacion('Aviso',data.respuesta);
        })
        .catch(error => {
          // Maneja cualquier error de la solicitud
          console.error(error);
        });
        const handleNotificacion=(tipo,mensaje)=>{
            setTipoNotificacion(tipo);
            setMensajeNotificacion(mensaje);
            setModalAvisos(true);     
        }
  }; 
  const handleGetHTTPProductos = (id) => {
    console.log('muestro id: ',props.id);
    console.log('muestro metodo: ',props.metodo);
    fetch(apiUrl+'/api/Productos/'+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Manipula los datos de respuesta
        setValueName(data.Nombre);
        setDescripcion(data.Descripcion);
        setPrecioCompra(data.PrecioCompra);
        setPrecioVenta(data.PrecioVenta);
        setStock(data.Stock);
        setLote(data.Lote);
        setFechaDeVencimiento(data.FechaVencimiento);
        setFechaDeIngreso(data.FechaIngreso);
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });
  
};
useEffect(() => {handleGetHTTPProductos(props.id);},[props.metodo])


//----------------------------------------------------LOGICA DEL COMPONENTE------------------------------------------------------------->


//----------------------------------------------------VISUAL---------------------------------------------------------------------------->
   return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            >
                {props.metodo?(
//----------------------------------------------------SECCION UPDATE------------------------------------------------------------------------------>
                    <div>
                        <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    MODIFICAR PRODUCTO
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='row mb-3'>
                    <h6 className='text-uppercase mb-3'>DATOS DEL PRODUCTO </h6>
                    <div className='col-6 mb-2'>
                        <label htmlFor="floatingInputValue1">Nombre: </label>
                        <input type="text" className="form-control" id="floatingInputValue1" name="Nombre" value={inputName?? ''}  onChange={(event) => setValueName(event.target.value)}/>
                    </div   >
                    <div className='col-6 mb-2'>
                        <label htmlFor="floatingInputValue2">Descripción:</label>
                        <input type="text" className="form-control" id="floatingInputValue2" value={inputDescripcion?? ''}  onChange={(event) => setDescripcion(event.target.value)} />
                    </div>
                    <div className='col-2 mb-2'>
                        <label htmlFor="floatingInputValue3">Precio Compra: </label>
                        <input type="text" className="form-control" id="floatingInputValue2" value={inputPrecioCompra?? ''}  onChange={(event) => setPrecioCompra(event.target.value)} />
                    </div>
                    <div className='col-2 mb-2'>
                        <label htmlFor="floatingInputValue4">Precio Venta: </label>
                        <input type="text" className="form-control" id="floatingInputValue4" value={inputPrecioVenta?? ''} onChange={(event) => setPrecioVenta(event.target.value)} />
                    </div>
                    <div className='col-1 mb-3'>
                        <label htmlFor="floatingInputValue5">Stock: </label>
                        <input type="text" className="form-control" id="floatingInputValue5" value={inputStock?? ''} onChange={(event) => setStock(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Lote:</label>
                        <input type="text" className="form-control" id="floatingInputValue6" value={inputLote?? ''}  onChange={(event) => setLote(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Fecha de Vencimiento:</label>
                        <input type="date" className="form-control" id="floatingInputValue6" value={inputFechaDeVencimiento?? ''}  onChange={(event) => setFechaDeVencimiento(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Fecha de Ingreso:</label>
                        <input type="date" className="form-control" id="floatingInputValue6" value={inputFechaDeIngreso?? ''}  onChange={(event) => setFechaDeIngreso(event.target.value)}/>
                    </div>
    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleUpdate(props.id)}> Actualizar Datos </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
                    </div>
                ):(
//----------------------------------------------------SECCION REGISTER---------------------------------------------------------------------------->                    
                    <div>
                        <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    NUEVO PRODUCTO
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='row mb-3'>
                    <h6 className='text-uppercase mb-3'>DATOS DEL PRODUCTO </h6>
                    <div className='col-6 mb-2'>
                        <label htmlFor="floatingInputValue1">Nombre: </label>
                        <input type="text" className="form-control" id="floatingInputValue1" placeholder='ej: Pepito' onChange={(event) => setValueName(event.target.value)}/>
                    </div>
                    <div className='col-6 mb-2'>
                        <label htmlFor="floatingInputValue2">Descripción:</label>
                        <input type="text" className="form-control" id="floatingInputValue2" placeholder='ej: Rodriguez' onChange={(event) => setDescripcion(event.target.value)} />
                    </div>
                    <div className='col-2 mb-2'>
                        <label htmlFor="floatingInputValue3">Precio Compra: </label>
                        <input type="text" className="form-control" id="floatingInputValue2" placeholder='ej: Rodriguez' onChange={(event) => setPrecioCompra(event.target.value)} />
                    </div>
                    <div className='col-2 mb-2'>
                        <label htmlFor="floatingInputValue4">Precio Venta: </label>
                        <input type="text" className="form-control" id="floatingInputValue4" onChange={(event) => setPrecioVenta(event.target.value)} />
                    </div>
                    <div className='col-1 mb-3'>
                        <label htmlFor="floatingInputValue5">Stock: </label>
                        <input type="text" className="form-control" id="floatingInputValue5" placeholder='ej: example@gmail.com'onChange={(event) => setStock(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Lote:</label>
                        <input type="text" className="form-control" id="floatingInputValue6" placeholder='ej: 099999999' onChange={(event) => setLote(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Fecha de Vencimiento:</label>
                        <input type="date" className="form-control" id="floatingInputValue6" placeholder='ej: 099999999' onChange={(event) => setFechaDeVencimiento(event.target.value)}/>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor="floatingInputValue6">Fecha de Ingreso:</label>
                        <input type="date" className="form-control" id="floatingInputValue6" placeholder='ej: 099999999' onChange={(event) => setFechaDeIngreso(event.target.value)}/>
                    </div>
    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleRegister()}> Crear </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
                    </div>
                )}
            
            <ModalAvisos
                show={modalAvisos}
                onHide={() => setModalAvisos(false)}
                tipo={tipoNotificacion}
                mensaje={mensajeNotificacion}
                />
        </Modal>
    )
}

export default NewProductModal