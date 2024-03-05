import React from "react";
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
// Importacion de paginas para el ruteo 
import Login from "./pages/loginPage/Login";
import Home from "./pages/admindashboard/Home";
import Caja from "./pages/admindashboard/Caja";
import Pagos from "./pages/admindashboard/Pagos";
import Socios from "./pages/admindashboard/Socios";
import Productos from "./pages/admindashboard/Productos";
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/">
                <Route index element={<Login/>}></Route>
                <Route path="home" element={<Home/>}></Route>
                <Route path="socios" element={<Socios/>}></Route>   
                <Route path="pagos" element={<Pagos/>}></Route>   
                <Route path="caja" element={<Caja/>}></Route>   
                <Route path="productos" element={<Productos/>}></Route> 
                
              </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;