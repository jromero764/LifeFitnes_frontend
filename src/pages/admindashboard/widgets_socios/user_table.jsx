import './widgets_socios.css'
import {useEffect, useState} from 'react';
import NewUserModal from './new_user_modal';
import ModalAvisos from '../../../Utils/ModalAvisos';


const User_table = () => {
    const [socios, setSocios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [modalShow, setModalShow] = useState(false);
    const [ci, setCi] = useState();
    const [metodo, setMetodo] = useState(false);
    const [modalShowConfirmacion, setModalConfirmacion] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState();
    const [modalAvisos, setModalAvisos] = useState(false);
    const [tipoNotificacion, setTipoNotificacion] = useState();
    const [mensajeNotificacion, setMensajeNotificacion] = useState(); 
    const [respuesta, setRespuesta] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const peticionGet = async() =>{
        const url = apiUrl+'/api/Usuarios/0';
        const response =  fetch (url,{
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            setSocios(response);
            setTablaUsuarios(response);
        });
    }
    const handleNotificacion=(tipo,mensaje)=>{
        setTipoNotificacion(tipo);
        setMensajeNotificacion(mensaje);
        setModalShow(false);
        setModalAvisos(true);
             
    }
    const handleResponse=(id)=>{
        console.log(id);
        setId(id);
        handleNotificacion('Confirmacion','SEGURO QUE DESEA ELIMINAR'); 
    }
    const handleDelete = (ci) => {
          fetch(apiUrl+'/api/Usuarios/'+ci, {
            method: 'DELETE',
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
              console.log(data);
              peticionGet();
            })
            .catch(error => {
              // Maneja cualquier error de la solicitud
              console.error(error);
            });
        
      }; 
      useEffect(() => {
        if(respuesta==='true'){
          handleDelete(id);
          handleNotificacion('Aviso','Se elimino el usuario con exito');
        }
      }, [respuesta])
    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda = tablaUsuarios.filter((elemento)=>{
            if(elemento.Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
              || elemento.ci.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
        setSocios(resultadosBusqueda);
        }
        const handleUpdate=(ci)=>{
            setModalShow(true);
            setCi(ci);
            setMetodo('PATCH');
        }
        const handleRegister=()=>{
            setModalShow(true);
            setMetodo(false);
        }
    useEffect(()=>{
       peticionGet();
    },[])
        
    return (
        
        <div>
            <div className='row'>
                <div className="col-3">
                    <h3 className='mt-2'>GESTION DE SOCIOS</h3>
                </div>
                <div className="col-9">
                <div className='d-flex py-2 justify-content-end'>
                
                <div className='input-group w-50'>
                    <input type="text" className='form-control' value={busqueda} placeholder='Buscar' onChange={handleChange}/>
                    <button className='btn btn-primary'><i className="bi bi-search"></i></button>
                </div>

                <button className='btn btn-outline-success mx-2' variant="primary" onClick={() => handleRegister()}>
                    <i className='bi bi-person-plus'></i>
                </button>
                <NewUserModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    metodo={metodo}
                    ci={ci}
                />
               
            </div>
                </div>
                </div>
           
            <div className="card shadow-sm my-2 tablas">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">CI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope='col'>Acciones</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {socios.map((socio) => (
                            <tr key={socio.ci}>
                                <th scope="row">{socio.ci}</th>
                                <td>{socio.Nombre}</td>
                                <td>{socio.Apellido}</td>
                                <td>{socio.Sexo}</td>
                                <td>{socio.FechaDeNacimiento}</td>
                                <td>{socio.Mail}</td>
                                <td>{socio.Telefono}</td>
                                <td>
                                <button onClick={() => handleResponse(socio.ci)}  className='btn btn-outline-danger mx-2'>
                                    <i className='bi bi-trash'> </i>
                                </button>
                                <button onClick={() => handleUpdate(socio.ci)} className='btn btn-outline-primary mx-2'>
                                    <i className='bi bi-pen'></i>
                                </button>    
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                <ModalAvisos
        show={modalAvisos}
                        onHide={() => setModalAvisos(false)}
                        tipo={tipoNotificacion}
                        mensaje={mensajeNotificacion}
                        respuesta={respuesta}
                        setRespuesta={setRespuesta}
        />
    </div>
            </div>
        </div>
        
    )
}

export default User_table