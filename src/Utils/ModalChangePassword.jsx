import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState,useEffect} from 'react';
import Cookies from 'js-cookie';
const ModalChangePassword = (props) =>{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [ModalChangePassword, setModalChangePassword] = useState(false);
    const [valuePassword, setValuePassword] = useState('');
    const [valuePassword2, setValuePassword2] = useState('');
    const [mensaje, setMensaje] = useState();
    const [respuesta, setRespuesta] = useState();
    const [ci, setci] = useState(Cookies.get('Sesion'));

    const ChangePassword=()=>{
        if (valuePassword==='' || valuePassword2===''){
            return setMensaje('Los campos no pueden quedar vacios');
        }
        if (valuePassword!=valuePassword2){
            return setMensaje('Las contraseñas no coinciden');
        }
        const data = {
            ci,
            password: valuePassword
          };
          console.log(apiUrl+'/api/ChangePassword');
          fetch(apiUrl+'/api/ChangePassword', {
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
                setRespuesta(true);
                setMensaje(data.respuesta);
                return setTimeout(() => {
                    window.location.reload();
                }, 4000);
            })
            .catch(error => {
              // Maneja cualquier error de la solicitud
              console.error(error);
            });
    }
   return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Cambio de Contraseña</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='col-2 mb-2'>
                                    <label htmlFor="floatingInputValue">Nueva Contraseña</label>
                                    <input type="text" className="form-control" id="floatingInputValue" onChange={(event) => setValuePassword(event.target.value)}/>
            </div>
            <div className='col-2 mb-2'>
                                    <label htmlFor="floatingInputValue">Repita Contraseña</label>
                                    <input type="text" className="form-control" id="floatingInputValue" onChange={(event) => setValuePassword2(event.target.value)}/>
            </div>
            {respuesta?(
                <div className="col-3 ms-3 text-success">
                    <p className='mt-5'>{mensaje}</p>
                </div>
            ):(
                <div className="col-3 ms-3 text-danger">
                    <p className='mt-5'>{mensaje}</p>
                </div>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant='primary' onClick={()=>{ChangePassword()}}>Cambiar</Button>
            <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalChangePassword;