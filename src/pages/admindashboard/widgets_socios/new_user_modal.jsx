import './widgets_socios.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import ModalAvisos from '../../../Utils/ModalAvisos';
import CircularProgress from '@mui/material/CircularProgress';

const NewUserModal = ({ data, metodo, onHide, show }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [inputCi, setValueCi] = useState();
  const [inputName, setValueName] = useState();
  const [inputApellido, setValueApellido] = useState();
  const [inputCorreo, setValueCorreo] = useState();
  const [inputTelefono, setValueTelefono] = useState();
  const [inputPassword, setValuePassword] = useState();
  const [inputFecha, setValueFecha] = useState();
  const [selectSexo, getvalueSexo] = useState();
  const [selectOpt, getValueOpt] = useState();
  const [id, setId] = useState()
  const [tipoNotificacion, setTipoNotificacion] = useState();
  const [mensajeNotificacion, setMensajeNotificacion] = useState();
  const [modalAvisos, setModalAvisos] = useState(false);
  const [respuesta, setRespuesta] = useState();
  const [loading, setLoading] = useState(false);
  const handleNotificacion = (tipo, mensaje) => {
    setTipoNotificacion(tipo);
    setMensajeNotificacion(mensaje);
    setModalAvisos(true);

  }
  const handleRegister = () => {
    const data = {
      ci: inputCi,
      Nombre: inputName,
      Apellido: inputApellido,
      FechaDeNacimiento: inputFecha,
      Telefono: inputTelefono,
      Mail: inputCorreo,
      Sexo: selectSexo,
      Opcion: selectOpt,
      password: inputPassword,
    };
    fetch(apiUrl + '/api/Usuarios', {
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
        handleNotificacion('AVISO', data.respuesta);
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });

  };
  const handleUpdate = (ci) => {
    const data = {
      ci: inputCi,
      Nombre: inputName,
      Apellido: inputApellido,
      FechaDeNacimiento: inputFecha,
      Telefono: inputTelefono,
      Mail: inputCorreo,
      Sexo: selectSexo,
      Opcion: selectOpt,
      password: inputPassword,
    };
    fetch(apiUrl + '/api/Usuarios/' + id, {
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
        handleNotificacion('Aviso', 'Se Modifico con exito');
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });

  };

  useEffect(() => {

    setValueCi(data.ci);
    setValueName(data.Nombre);
    setValueApellido(data.Apellido);
    setValueCorreo(data.Mail);
    setValueTelefono(data.Telefono);
    setValueFecha(data.FechaDeNacimiento);
    setId(data.id)
    getvalueSexo(data.Sexo);
  }, [data])


  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalAvisos
        show={modalAvisos}
        onHide={() => setModalAvisos(false)}
        tipo={tipoNotificacion}
        mensaje={mensajeNotificacion}
        respuesta={respuesta}
        setRespuesta={setRespuesta}

      />
      {metodo ? (
        //-----------------------------------------------------------------SECCION UPDATE SOCIO--------------------------------------------------------------------------->
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              MODIFICAR SOCIO
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='row mb-3'>
              <h4 className='text-uppercase mb-3'>Datos Personales </h4>
              <div className='col-2 mb-2'>
                <label htmlFor="floatingInputValue">Cédula</label>
                <input type="text" className="form-control" id="floatingInputValue" value={inputCi ?? ''} onChange={(event) => setValueCi(event.target.value)} />
              </div>
              <div className='col-5 mb-2'>
                <label htmlFor="floatingInputValue1">Nombre: </label>
                <input type="text" className="form-control" id="floatingInputValue1" value={inputName ?? ''} onChange={(event) => setValueName(event.target.value)} />
              </div>
              <div className='col-5 mb-2'>
                <label htmlFor="floatingInputValue2">Apellido:</label>
                <input type="text" className="form-control" id="floatingInputValue2" value={inputApellido ?? ''} onChange={(event) => setValueApellido(event.target.value)} />
              </div>
              <div className='col-4 mb-2'>
                <label htmlFor="floatingInputValue3">Sexo: </label>
                <select className='form-select' name="" id="floatingInputValue3" value={selectSexo ?? ''} onChange={(event) => getvalueSexo(event.target.value)}>
                  <option value="">Seleccione Sexo</option>
                  <option value="Mujer">Femenino</option>
                  <option value="Hombre">Masculino</option>
                  <option value="Sin definir">Sin Definir</option>
                </select>
              </div>
              <div className='col-4 mb-2'>
                <label htmlFor="floatingInputValue4">Fecha de Nacimiento: </label>
                <input type="date" className="form-control" id="floatingInputValue4" value={inputFecha ?? ''} onChange={(event) => setValueFecha(event.target.value)} />
              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="floatingInputValue5">Correo: </label>
                <input type="text" className="form-control" id="floatingInputValue5" value={inputCorreo ?? ''} onChange={(event) => setValueCorreo(event.target.value)} />
              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="floatingInputValue6">Telefono:</label>
                <input type="text" className="form-control" id="floatingInputValue6" value={inputTelefono ?? ''} onChange={(event) => setValueTelefono(event.target.value)} />
              </div>
              <hr className='text-secondary mb-3' />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => handleUpdate(data.id)}> Actualizar Datos </Button>
            <Button onClick={onHide}>Cerrar</Button>
          </Modal.Footer>
        </div>
      ) : (
        //-----------------------------------------------------------------SECCION REGISTRO SOCIO--------------------------------------------------------------------------->
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              NUEVO USUARIO DEL SISTEMA
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='row mb-3'>
              <h4 className='text-uppercase mb-3'>Datos Personales </h4>
              <div className='col-2 mb-2'>
                <label htmlFor="floatingInputValue">Cédula</label>
                <input type="text" className="form-control" id="floatingInputValue" placeholder='ej: 12345678' onChange={(event) => setValueCi(event.target.value)} />
              </div>
              <div className='col-5 mb-2'>
                <label htmlFor="floatingInputValue1">Nombre: </label>
                <input type="text" className="form-control" id="floatingInputValue1" placeholder='ej: Pepito' onChange={(event) => setValueName(event.target.value)} />
              </div>
              <div className='col-5 mb-2'>
                <label htmlFor="floatingInputValue2">Apellido:</label>
                <input type="text" className="form-control" id="floatingInputValue2" placeholder='ej: Rodriguez' onChange={(event) => setValueApellido(event.target.value)} />
              </div>
              <div className='col-4 mb-2'>
                <label htmlFor="floatingInputValue3">Sexo: </label>
                <select className='form-select' name="" id="floatingInputValue3" onChange={(event) => getvalueSexo(event.target.value)}>
                  <option value="">Seleccione Sexo</option>
                  <option value="Mujer">Femenino</option>
                  <option value="Hombre">Masculino</option>
                  <option value="Sin definir">Sin Definir</option>
                </select>
              </div>
              <div className='col-4 mb-2'>
                <label htmlFor="floatingInputValue4">Fecha de Nacimiento: </label>
                <input type="date" className="form-control" id="floatingInputValue4" onChange={(event) => setValueFecha(event.target.value)} />
              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="floatingInputValue5">Correo: </label>
                <input type="text" className="form-control" id="floatingInputValue5" placeholder='ej: example@gmail.com' onChange={(event) => setValueCorreo(event.target.value)} />
              </div>
              <div className='col-6 mb-3'>
                <label htmlFor="floatingInputValue6">Telefono:</label>
                <input type="text" className="form-control" id="floatingInputValue6" placeholder='ej: 099999999' onChange={(event) => setValueTelefono(event.target.value)} />
              </div>
              <hr className='text-secondary mb-3' />
              <div className='col-4'>
                <label htmlFor="floatingInputValue7">Opcion:</label>
                <select className='form-select' name="" id="floatingInputValue7" onChange={(event) => getValueOpt(event.target.value)}>
                  <option value="">Seleccione tipo de Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Socio</option>
                </select>
              </div>
              {selectOpt == 'Administrador' && (
                <div className='col-4'>
                  <label htmlFor="floatingInputValue7">Contraseña</label>
                  <input type="text" className="form-control" id="floatingInputValue6" placeholder='ej: 099999999' onChange={(event) => setValuePassword(event.target.value)} />
                </div>
              )}

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => handleRegister()}> Crear nuevo </Button>
            <Button onClick={onHide}>Cerrar</Button>
          </Modal.Footer>
        </div>
      )}

      {loading && <CircularProgress />}
    </Modal>

  )
}

export default NewUserModal