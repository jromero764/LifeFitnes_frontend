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
export const postUser = (data) => {
    return axios.post(`${apiUrl}/Usuarios`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}

// export const updateUser = (inputCi) => {
//     return axios.put(`${apiUrl}/Usuarios`, inputCi, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
// }

export const updateUser = (data) => {
    return axios.patch(`${apiUrl}/Usuarios/${data.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}

export const deleteUser = (id) => {
    return axios.delete(`${apiUrl}/Usuarios/${id}`);
}

