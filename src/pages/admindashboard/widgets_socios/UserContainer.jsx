import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NewUserModal from './new_user_modal';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUser } from '../../../Utils/apiRest';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ModalDelete from '../../../Utils/ModalDelete'
import { deleteUser } from '../../../apiRest/UsuariosHTTP';


export default function UserContainer() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [allUser, setAllUser] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState({})
    const [metodo, setMetodo] = useState(false)
    const [ modalShow, setModalShow] = useState(false);
    const [ modalDelete, setModalDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    // const handleNotificacion=(tipo,mensaje)=>{
    //     setTipoNotificacion(tipo);
    //     setMensajeNotificacion(mensaje);
    //     setModalShow(false);
    //     setModalDelete(true);    
    // }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleGetUser = async () => {
        setLoading(true); // Establecer loading a true al comenzar la carga

        try {
            let response = await getAllUser();
            setAllUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false); // Establecer loading a false después de completar la carga

        }
    }
    const handleEditUser = (user) => {
        console.log(user)
        setModalShow(true)
        setData(user)
        setMetodo(true)
    }

    const handleNewUser = () => {
        setModalShow(true)
        // setData(user)
        setMetodo(false)
    }

    // const handleDeleteUser = (user) => {
        // setModalShow(true)
        // setData(user)
        // setMetodo(false)
    // }

    const handleDeleteUser =  (user) => {
        console.log(user)
        // setLoading(true); // Establecer loading a true al comenzar la eliminación
        setModalDelete(true)
        setData(user)
    }
    

    const filterUser = allUser.filter((e) => {
        const searchTermLower = searchTerm.toLowerCase();
        const ci = e.ci ? e.ci.toString().toLowerCase() : '';
        const nombre = e.Nombre ? e.Nombre.toLowerCase() : '';
        const apellido = e.Apellido ? e.Apellido.toLowerCase() : '';


        return ci.includes(searchTermLower) || nombre.includes(searchTermLower) || apellido.includes(searchTermLower);
    })
    useEffect(() => {
        setLoading(true);
        handleGetUser()
    }, [])
    useEffect(() => {
        setAllUser(filterUser)
        if (searchTerm == '') {
            handleGetUser()
        }
    }, [searchTerm])
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Grid container justifyContent="space-between" alignItems="center" spacing={1}>

                    <Grid item sx={{ marginLeft: '1%', marginTop: '0' }}>
                        {/* <Grid item sx={{ marginRight: '5px', marginLeft: '1%' }}> */}
                        <TextField
                            label="Buscar ..."
                            variant="standard"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item>
                        <SearchIcon />
                    </Grid> */}
                    <Grid item sx={{ marginRight: '1%' }} >

                        <Button variant="contained" color="success"
                            onClick={() => { handleNewUser() }} >
                            <PersonAddAltIcon sx={{ marginRight: '0.5rem' }}></PersonAddAltIcon>
                            Crear usuario
                        </Button>
                    </Grid>


                </Grid>
                {/* <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
                   
                </Grid> */}
                <TableContainer sx={{ height: '100%'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff" }}>
                                    Cédula
                                </TableCell>
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff"  }}>
                                    Nombre
                                </TableCell>
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff"  }}>
                                    Apellido
                                </TableCell>
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff"  }}>
                                    Fecha De Nacimiento
                                </TableCell>
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff"  }}>
                                    Teléfono
                                </TableCell>
                                <TableCell sx={{ backgroundColor: '#01161e', color: "#ffffff"}}>
                                    Mail
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', backgroundColor: '#01161e', color: "#ffffff"  }}>
                                    Gestion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUser
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(user => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                {user.ci}
                                            </TableCell>
                                            <TableCell>
                                                {user.Nombre}
                                            </TableCell>
                                            <TableCell>
                                                {user.Apellido}
                                            </TableCell>
                                            <TableCell>
                                                {user.FechaDeNacimiento}
                                            </TableCell>
                                            <TableCell>
                                                {user.Telefono}
                                            </TableCell>
                                            <TableCell>
                                                {user.Mail}
                                            </TableCell>
                                            <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <BorderColorIcon
                                                    onClick={() => { handleEditUser(user) }}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                                <Box marginLeft={1} marginRight={1}>
                                                    <DeleteForeverIcon
                                                        onClick={() => { handleDeleteUser(user)}}
                                                        sx={{ cursor: 'pointer' }}
                                                    /></Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={allUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
            <NewUserModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={data}
                metodo={metodo}
            />
            <ModalDelete
            show={modalDelete}
            data={data}
            setModalDelete={setModalDelete}
            />

            {loading && <CircularProgress />}
        </>
    );
}