import axios from "axios";
const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
// return axios.post(`${API_URL}/v1/usuarioMonitoreado/asignacionFallidaSGSP`, data, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })


// export const getAllUser = () => {
//     return axios.get(`${apiUrl}/Usuarios/0`)
// }

export const obtenerTransaccionesHTTP = (opcion,fecha) => {
    return axios.get(`${apiUrl}/Transacciones/${opcion}/${fecha}`)
}

