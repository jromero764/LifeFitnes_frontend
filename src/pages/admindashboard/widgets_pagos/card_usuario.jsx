import { useEffect,useState } from "react";
import Cookies from 'js-cookie';
import ModalAvisos from "../../../Utils/ModalAvisos";

const Cards = (props) =>{
    const apiUrl = process.env.REACT_APP_API_URL;
    const [modalShow, setModalShow] = useState(false);
    const [titulo, settitulo] = useState();
    const [mensaje, setmensaje] = useState();
    const [contador, setcontador] = useState();
    var vencido;
    const handleMessage=(respuesta)=>{
        setModalShow(true);
        settitulo('AVISO');
        setmensaje(respuesta);
    }
    if(props.diasDeCuota==='Esta vencido'){
        vencido=true;
    }

    const RegistroDeCuota=(inputCi)=>{   
        
        const data = {
            ci:Cookies.get('Sesion'),
            socios_ci: inputCi,
            productos_id:1,
            TipoDeTransaccion:"Venta",
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
              handleMessage(data.respuesta);
            })
            .catch(error => {
              // Maneja cualquier error de la solicitud
              console.error(error);
            });
       }  
    return (
        <div className="card w-100 h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">
                    DATOS DEL SOCIO
                </h5>
            </div>
            <div className="row card-body">
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputValue2" placeholder="name@example.com" value={props.infosocio?.ci} disabled/>
                        <label htmlFor="floatingInputValue2">Cédula</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputValue1" placeholder="name@example.com" value={props.infosocio?props.infosocio.Nombre+" "+props.infosocio.Apellido:""}  disabled/>
                        <label htmlFor="floatingInputValue1">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputValue3" placeholder="name@example.com" value={props.infosocio?.Mail} disabled/>
                        <label htmlFor="floatingInputValue3">Correo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputValue3" placeholder="Telefono" value={props.infosocio?.Telefono} disabled/>
                        <label htmlFor="floatingInputValue3">Telefono</label>
                    </div>
                </div>
                <div className="col-2 form-floating mb-3">           
                    {props.diasDeCuota ? (
                    <input type="text" className="form-control text-white bg-success" id="floatingInputValue4" placeholder="name@example.com" value='HABILITADO' disabled/>
                    ) 
                    :
                    (
                        <input type="text" className="form-control text-white bg-danger" id="floatingInputValue4" placeholder="name@example.com" value='INHABILITADO' disabled/>
                    )}

                </div>

                <div className="col-2 form-floating mb-3" >
                    <button onClick={() => RegistroDeCuota(props.infosocio.ci)} className="btn btn-primary w-100">Registrar Cuota</button>
                </div>
                <ModalAvisos
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    titulo={titulo}
                    mensaje={mensaje}
                />
            </div>
            <div className="row card-body">
                <div className="col-6">
                <p> INGRESOS </p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Fecha Ingreso</th>
                        <th scope="col">Hora Ingreso</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.infoingresos?.map((ingreso) => (
                            <tr key={ingreso.id}>
                                <td>{ingreso.FechaIngreso}</td>
                                <td>{ingreso.HoraIngreso}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className="col-6">
                <p> CUOTAS ABONADAS </p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Fecha de Pago</th>
                        <th scope="col">Hora de Pago</th>
                        <th scope="col">Cedula de Cobrador </th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.infopago?.map((pago) => (
                            <tr key={pago.id}>
                                <td>{pago.FechaTransaccion}</td>
                                <td>{pago.HoraTransaccion}</td>
                                <td>{pago.usuarios_ci}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                
            </div>
        </div>
    )
}

export default Cards