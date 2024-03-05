import { useEffect, useState } from "react";

const Cards = ({type}) =>{
//--------------------------------------------SETEO DE VARIALBES ---------------------------------------------------------------------------------------------------
const apiUrl = process.env.REACT_APP_API_URL;
const [respuestaActivos, setRespuestaActivos] = useState();
const [respuestaSexo, setRespuestaSexo] = useState();
const [respuestaEdad, setRespuestaEdad] = useState();
const [respuestaIngresos, setRespuestaIngresos] = useState();
//--------------------------------------------HANDLESS---------------------------------------------------------------------------------------------------
    function handleHTTPGetActivos() {

        fetch(apiUrl + '/api/Estadisticas/Usuarios/Activos', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                // Manipula los datos de respuesta
                
                setRespuestaActivos(data);
            })
            .catch(error => {
                // Maneja cualquier error de la solicitud
                console.error(error);
            });

    }
    function handleHTTPGetSexo() {

        fetch(apiUrl + '/api/Estadisticas/Usuarios/Sexo', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                // Manipula los datos de respuesta
                
                setRespuestaSexo(data);
            })
            .catch(error => {
                // Maneja cualquier error de la solicitud
                console.error(error);
            });

    }
    function handleHTTPGetEdad() {
        fetch(apiUrl + '/api/Estadisticas/Usuarios/Edad', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                // Manipula los datos de respuesta
                
                setRespuestaEdad(data);
            })
            .catch(error => {
                // Maneja cualquier error de la solicitud
                console.error(error);
            });

    }
    function handleHTTPGetIngresos() {
        fetch(apiUrl + '/api/Estadisticas/Usuarios/Ingresos', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                // Manipula los datos de respuesta
                
                setRespuestaIngresos(data);
            })
            .catch(error => {
                // Maneja cualquier error de la solicitud
                console.error(error);
            });

    }

//--------------------------------------------LOGICA DEL COMPONENTE---------------------------------------------------------------------------------------------------
useEffect(() => {
    handleHTTPGetActivos();
    handleHTTPGetSexo();
    handleHTTPGetEdad();
    handleHTTPGetIngresos();
}, [])


//--------------------------------------------VISTA---------------------------------------------------------------------------------------------------


    return (
        <div className="card w-100 h-100 shadow-sm">
     
            <div className="row">
                <div className="col border">
                    <div className="card-body">
                        <h5 className="card-title">SOCIOS ACTIVOS VS PASIVOS</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Activos: {respuestaActivos?.Activos}</p>
                        <p className="card-text">Pasivos: {respuestaActivos?.Pasivos}</p>
                    </div>
                    <div className="card-body">
                        <a href="" className="text-decoration-none" >Ver mas <i className="bi bi-arrow-right"></i></a>
                    </div>
                </div>
                <div className="col border">
                    <div className="card-body">
                        <h5 className="card-title">CANTIDAD MUJERES VS HOMBRES</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Mujeres: {respuestaSexo?.Femeninos} </p>
                        <p className="card-text">Hombres: {respuestaSexo?.Masculinos}</p>
                    </div>
                    <div className="card-body">
                        <a href="" className="text-decoration-none" >Ver mas <i className="bi bi-arrow-right"></i></a>
                    </div>
                </div>
                <div className="col border">
                    <div className="card-body">
                        <h5 className="card-title">EDAD PROMEDIO</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Mujeres: {respuestaEdad?.EdadMujeres}</p>
                        <p className="card-text">Hombres: {respuestaEdad?.EdadHombres}</p>
                    </div>
                    <div className="card-body">
                        <a href="" className="text-decoration-none" >Ver mas <i className="bi bi-arrow-right"></i></a>
                    </div>
                </div>
                <div className="col border">
                    <div className="card-body">
                        <h5 className="card-title">HORARIO MAS CONCURRIDO</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">HORARIO: {respuestaIngresos??''}</p>
                    </div>
                    <div className="card-body">
                        <a href="" className="text-decoration-none" >Ver mas <i className="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Cards