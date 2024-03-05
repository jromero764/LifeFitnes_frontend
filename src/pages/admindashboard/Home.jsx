import Navbar from "./components/navbar"
import Sidebar from './components/sidebar'
import Footerbar from './components/footerbar'
import Cards from './widgets_home/cards'
import Charts from "./widgets_home/cards_charts"
import Table from "./widgets_home/tables"
const home = () =>{
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
                <div className="row">
                <h2>Estadisticas</h2>
            </div>
                    <div className="row py-2">
                        <div>
                            <Cards type={4}/>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-6">
                            <p>Ultimos Ingresos</p>
                            <Table/>
                        </div>
                        <div className="col-6">
                            <p>Prueba</p>
                            <Charts/>
                        </div>
                    </div> */}
                    
                </div>
                <div className='col-12 footer text-bg-dark'>
                    <Footerbar/>
                </div>
            </div>
            
        </div>
    )
}

export default home