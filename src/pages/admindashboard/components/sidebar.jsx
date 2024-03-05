import { Fragment, useState } from 'react';
import './components_style.css';
import {Link} from 'react-router-dom';
import ModalChangePassword from '../../../Utils/ModalChangePassword';
const Sidebar = () =>{
    
    const [modalChangePassword, setModalChangePassword] = useState(false);
    
    
    return (
        <Fragment>
        <div className='sidebar'>
            <hr/>
            <div className='list py-3 h-100'>
                <div className="d-flex flex-column flex-shrink-0">
                    <ul className="nav nav-pills d-flex justify-content-between">
                        <li className='w-100'>
                            <Link to="/home">
                                <div className="nav-link text-white d-inline-flex d-flex justify-content-center w-100" aria-current="page">
                                    <i className="bi bi-house me-2"></i>
                                    <p className='me-1'>INICIO</p>
                                </div>
                            </Link>
                        </li>
                        <li className='py-2 w-100'>
                            <Link to="/socios">
                                <div className="nav-link text-white d-inline-flex d-flex justify-content-center w-100">
                                    <i className="bi bi-person-circle me-2"></i>
                                    <p>SOCIOS</p>
                                </div>
                            </Link>
                        </li>
                        <li className='py-2 w-100'>
                            <Link to="/pagos">
                                <div className="nav-link text-white d-inline-flex d-flex justify-content-center w-100">
                                    <i className="bi bi-clipboard-check me-2"></i>
                                    <p>PAGOS</p>
                                </div>
                            </Link>
                        </li>
                        <li className='py-2 w-100'>
                            <Link to="/caja">
                                <div className="nav-link text-white d-inline-flex d-flex justify-content-center w-100">
                                    <i className="bi bi-cash-coin me-2"></i>
                                    <p className='me-2'>CAJA</p>
                                </div>
                            </Link>
                        </li>
                        <li className='py-2 w-100'>
                            <Link to="/productos">
                                <div className="nav-link text-white d-inline-flex d-flex justify-content-center w-100">
                                    <i className="bi bi-basket me-2"></i>
                                    <p>PRODUCTOS</p>
                                </div>
                            </Link>
                        </li>
                        <li className='py-2 w-100'>
                        <div class="btn-group">
                            <i className='bi bi-person-circle me-2'></i>
                            <button type="button" class=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                PERFIL
                            </button>
                            <ul class="dropdown-menu">
                                <li><a onClick={()=>{setModalChangePassword(true)}} class="dropdown-item" href="#">Cambiar Password</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <Link to='/'>
                                    <li><a class="dropdown-item" href="#">Cerrar Sesion</a></li>
                                </Link>
                                
                            </ul>
                            </div>
                        </li>
                    </ul>                  
                </div>
            </div>
            <hr/>
        </div>
        
        <ModalChangePassword 
         show={modalChangePassword}
         onHide={() => setModalChangePassword(false)}
        />
        </Fragment>
    )
}

export default Sidebar