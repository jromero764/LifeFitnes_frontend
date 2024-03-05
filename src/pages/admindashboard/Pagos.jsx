import Navbar from "./components/navbar"
import Sidebar from './components/sidebar'
import Footerbar from './components/footerbar'
import Cards from "./widgets_pagos/card_usuario"
import React, { useState } from 'react';
import { Spinner } from "react-bootstrap";
import ModalAvisos from "../../Utils/ModalAvisos";

const Pagos = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [inputCi,setValueCi] = useState();
  const [infosocio, setInfosocio] = useState();
  const [infopago, setInfopago] = useState();
  const [infoingresos, setInfoingresos] = useState();

  const [modalShow, setModalShow] = useState(false);
  const [titulo, settitulo] = useState();
  const [mensaje, setmensaje] = useState();
  const [diasDeCuota, setdiasDeCuota] = useState();
 
    const [tipoNotificacion, setTipoNotificacion] = useState(); 
    const [mensajeNotificacion, setMensajeNotificacion] = useState();
    const [respuesta, setRespuesta] = useState();
    const [modalAvisos, setModalAvisos] = useState(false);

  const handleNotificacion=(tipo,mensaje)=>{
        setTipoNotificacion(tipo);
        setMensajeNotificacion(mensaje);
        setModalShow(false);
        setModalAvisos(true);    
    }
  const handleHTTPGetUsuario = (inputCi) => {
      fetch(apiUrl+'/api/Usuarios/'+inputCi, {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then(data => {
          // Manipula los datos de respuesta
          if (Object.keys(data).length===0){
            console.log('no');
           return handleNotificacion('Aviso','Usuario no existe');
          }
          setInfosocio(data);
          console.log(data);
        })
        .catch(error => {
          // Maneja cualquier error de la solicitud
          console.error(error);
        });
    
  };
  const handleHTTPGetIngresos = (inputCi) => {
       fetch(apiUrl+'/api/Ingresos/'+inputCi, {
         method: 'GET'
       })
         .then(response => {
           if (!response.ok) {
             throw new Error('Error en la solicitud');
           }
           return response.json();
         })
         .then(data => {
           // Manipula los datos de respuesta
           setInfoingresos(data);
         })
         .catch(error => {
           // Maneja cualquier error de la solicitud
           console.error(error);
         });
     
   }; 
   const handleHTTPGetCuotas = (inputCi) => {
       fetch(apiUrl+'/api/Cuotas/'+inputCi, {
         method: 'GET'
       })
         .then(response => {
           if (!response.ok) {
             throw new Error('Error en la solicitud');
           }
           return response.json();
         })
         .then(data => {
           // Manipula los datos de respuesta
           setInfopago(data);
           console.log(data);
         })
         .catch(error => {
           // Maneja cualquier error de la solicitud
           console.error(error);
         });
     
   };
   const handleHTTPGetDiasDeCuota = (inputCi) => {
    var data = {"ci": parseInt(inputCi)};

    fetch(apiUrl+'/api/Ingresos', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(data)
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
        data?setdiasDeCuota(data.diasDeCuota):setdiasDeCuota(false);
        setdiasDeCuota(data.DiasDeCuota);
        console.log(data.DiasDeCuota);
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });
  
};
   const handleHTTPGetInformacionCompleta=(inputCi)=>{   
    handleHTTPGetUsuario(inputCi);
    handleHTTPGetDiasDeCuota(inputCi);
    handleHTTPGetIngresos(inputCi);
    handleHTTPGetCuotas(inputCi);
    
    
   }  
  return (
        <div className='home'>
            <div className='row'>
                <div className='col-12 bg-dark'>
                    <Navbar/>
                </div>
                <div className='col-2 text-bg-dark'>
                     <Sidebar/>  
                </div>
                <div className='col-10'>
                    <div className='d-flex py-2 justify-content-start'>
                        <div className='input-group w-25'>
                            <input type="text" className='form-control me-2' placeholder='Ingresar CI de Socio' onChange={(event) => setValueCi(event.target.value)}/>
                            <button onClick={() => handleHTTPGetInformacionCompleta(inputCi)} className='btn btn-primary'>Cargar Datos</button>
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
                         />
                    </div>                    
                </div>
                <div className='col-12 footer text-bg-dark'>
                    <Footerbar/>
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
        
    )
        
};

export default Pagos;


