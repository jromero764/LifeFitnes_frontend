import { useState } from "react"
import Navbar from "./components/navbar"
import Sidebar from './components/sidebar'
import Footerbar from './components/footerbar'
import Products_table from "./widgets_productos/products_table"


const Productos = () =>{
    const [respuesta, setRespuesta] = useState();
    return (
        <div className='home'>
            <div className='row'>
                <div className='col-12 bg-dark'>
                    <Navbar/>
                </div>
                <div className='col-2 text-bg-dark'>
                     <Sidebar/>  
                </div>
                <div className='col-10'>
                    <Products_table
                    respuesta={respuesta}
                    setRespuesta={setRespuesta}
                    />
                </div>
                <div className='col-12 footer text-bg-dark'>
                    <Footerbar/>
                </div>
            </div>
            
        </div>
    )
}

export default Productos