import axios from "axios";

// return axios.post(`${API_URL}/v1/usuarioMonitoreado/asignacionFallidaSGSP`, data, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

export const postUsuario= (data)=>{
    return axios.post(`${API_URL}/v1/usuarioMonitoreado/asignacionFallidaSGSP`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}