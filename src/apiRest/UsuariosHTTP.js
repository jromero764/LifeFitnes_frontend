import axios from "axios";
const apiUrl = `${process.env.REACT_APP_API_URL}/api`;

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

export const changePassword = (data) => {
    return axios.post(`${apiUrl}/ChangePassword`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
