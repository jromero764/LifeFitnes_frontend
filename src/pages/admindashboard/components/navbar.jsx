import {Link} from 'react-router-dom';
import ModalChangePassword from '../../../Utils/ModalChangePassword';
const logo = require('../../images/logo.png');

const navbar = () =>{
    return (
        <div className='row'>
            <div className='col-2'>
                <div className='d-flex align-items-center justify-content-center h-100 text-white'>
                    <div>
                       <div className='logo'>
                            <img src={logo} alt="logo" className='logo_image my-2'/>
                            <p className='py-2'>SALVAJE Life Fitness</p>   
                        </div> 
                    </div>
                    
                </div>
            </div>
            <div className='col-8'>
                {/* <div className='d-flex align-items-center justify-content-center h-100'>
                    <div>
                        <div className='input-group'>
                            <input type="text" className='form-control' placeholder='Buscar'/>
                            <button className='btn btn-primary'><i className="bi bi-search"></i></button>
                        </div>
                    </div>     
                </div> */}
            </div>
            <div className='col-2'>
                <div className='d-flex align-items-center justify-content-center h-100'>
              

                    <div>
                 
                        <Link to='/'> 
                        <button className='btn btn-danger'>SALIR</button>
                        </Link> 
                    </div>
                </div>                      
            </div>      
   
        </div>
    )
}

export default navbar