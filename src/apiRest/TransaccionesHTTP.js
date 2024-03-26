import axios from "axios";
const apiUrl = `${process.env.REACT_APP_API_URL}/api`;

export const obtenerTransaccionesHTTP = (opcion, fecha) => {
    return axios.get(`${apiUrl}/Transacciones/${opcion}/${fecha}`)
}

export const registrarNuevaTransaccion = (data) => {

    return axios.post(`${apiUrl}/Transacciones`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
