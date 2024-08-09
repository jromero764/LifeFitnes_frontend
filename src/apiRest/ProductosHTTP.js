import axios from "axios";
 // const apiUrl = process.env.REACT_APP_API_URL;
   const apiUrl = 'https://backend.salvajelife-fitness.online'
// return axios.post(`${API_URL}/v1/usuarioMonitoreado/asignacionFallidaSGSP`, data, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })


// export const getAllUser = () => {
//     return axios.get(`${apiUrl}/Usuarios/0`)
// }

export const eliminarProductoHTTP = (id) => {
    return axios.delete(`${apiUrl}/Productos/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}