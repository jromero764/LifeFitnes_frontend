import { useState, useEffect } from "react";
import NewProductModal from './new_product_modal';
import productos from "../Productos";
import ModalAvisos from "../../../Utils/ModalAvisos";
import ModalDelete from "../../../Utils/ModalDelete";
import ModalConfirmationV2 from "../../../Utils/ModalConfirmationV2";
import { eliminarProductoHTTP } from "../../../apiRest/ProductosHTTP";
import AlertDialog from "../../../Utils/DialogAvisos";
const Products_table = ({ respuesta, setRespuesta }) => {

  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
  if (mes < 10)
    mes = '0' + mes //agrega cero si el menor de 10
  var currentdate = ano + "-" + mes + "-" + dia;

  const [modalShow, setModalShow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [openDialogAviso, setOpenDialogAviso] = useState(false)
  const [show, setShow] = useState(false)
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState();
  const [metodo, setMetodo] = useState();
  const [productos, setProductos] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL;
  //   const apiUrl = 'https://backend.salvajelife-fitness.online'
  console.log(respuesta);
  const handleRefresh = () => {
    setRefresh(true)
  }
  const handleGetHTTPProductos = () => {
    fetch(apiUrl + '/api/Productos/0', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Manipula los datos de respuesta
        console.log(data.data);
        setProductos(data.data);
      })
      .catch(error => {
        // Maneja cualquier error de la solicitud
        console.error(error);
      });

  };
  useEffect(() => {
    handleGetHTTPProductos();

  }, [])

  const handlePatchHTTPProductos = (id) => {
    setModalShow(true);
    setId(id);
    setMetodo('PATCH');
  }
  const handlePostHTTPProductos = () => {
    setModalShow(true);
    setMetodo(null);
  }


  const handleDeleteProducto = async (id) => {
    setShow(true)
    setId(id)
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log('flag', flag)
      if (flag) {
        try {
          let response = await eliminarProductoHTTP(id)
          setOpenDialogAviso(true)
          setMensaje(response.data.respuesta)
          handleGetHTTPProductos()
        } catch (error) {
          // Maneja el error si es necesario
        } finally {
          setShow(false)
          setFlag(false)
        }
      }
    };

    fetchData();
  }, [flag]);
  useEffect(() => {
    if (refresh) {
      handleGetHTTPProductos();
      setRefresh(false)
    }
  }, [refresh])

  return (
    <div>
      <div className="row">
        <div className='col-3'>
          <h3 className='mt-2'>GESTION DE PRODUCTOS</h3>
        </div>
        <div className="col-9">
          <div className='d-flex py-2 justify-content-end'>
            <div className='input-group w-25'>
              <input type="text" className='form-control' />
              <button className='btn btn-primary'><i className="bi bi-search"></i></button>
            </div>
            <button className='btn btn-outline-success mx-2' variant="primary" onClick={() => handlePostHTTPProductos()}>
              <i className='bi bi-cart-plus'></i>
            </button>
            <button className='btn btn-outline-warning mx-2' variant="primary" onClick={() => handleDeleteProducto('Confirmacion', 'mensaje')}>
              <i className='bi bi-file-earmark-spreadsheet'></i>
            </button>

          </div>
        </div>

      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Lote</th>
            <th>Fecha de Vencimiento</th>
            <th>Fecha de Ingreso</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <th scope="row">{producto.id}</th>
              <td>{producto.Nombre}</td>
              <td>{producto.Descripcion}</td>
              <td>{producto.PrecioCompra}</td>
              <td>{producto.PrecioVenta}</td>
              <td>{producto.Stock}</td>
              <td>{producto.FechaIngreso}</td>
              <td>{producto.Lote}</td>
              <td>{producto.FechaVencimiento}</td>
              <td>
                <button onClick={() => handleDeleteProducto(producto.id)} className='btn btn-outline-danger mx-2'>
                  <i className='bi bi-trash'> </i>
                </button>
                <button onClick={() => handlePatchHTTPProductos(producto.id)} className='btn btn-outline-primary mx-2'>
                  <i className='bi bi-pen'></i>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*----------------------------------SECCION PARA LOS MODALES-------------------------------------*/}
      <NewProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
        metodo={metodo}
        refresh={handleRefresh}
      />

      <ModalConfirmationV2
        show={show}
        setShow={setShow}
        setFlag={setFlag}
      />
      <AlertDialog
        open={openDialogAviso}
        onHide={() => { setOpenDialogAviso(false) }}
        mensaje={mensaje}
      />
    </div>

  )
}
export default Products_table