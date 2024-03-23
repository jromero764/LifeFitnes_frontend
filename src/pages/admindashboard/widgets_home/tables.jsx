import React from 'react';
import './widgets_home.css';
//import XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
const table = () => {    
    const socios = [
        {
            id: 1,
            nombre: "Matias",
            apellido: "Rodriguez",
            hora_ingreso: "18:00 hs"
        },
        {
            id: 2,
            nombre: "Matias",
            apellido: "Rodriguez",
            hora_ingreso: "18:00 hs"
        },
        {
            id: 3,
            nombre: "Matias",
            apellido: "Rodriguez",
            hora_ingreso: "18:00 hs"
        }]
    const fileType= 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension= '.xlsx';
    const excelData=[
        {
            "Nombre":"Javier",
            "Apellido":"Romero",
            "Telefono":"230010"
        },
        {
            "Nombre":"Tatiana",
            "Apellido":"Perez",
            "Telefono":"0951010"
        },
        {
            "Nombre":"Santi",
            "Apellido":"Zapa",
            "Telefono":"0910202"
        }
    ]
    const ExportarExcel=()=>{
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb= {Sheets: {'data':ws},SheetNames:['data']};
    const excelBuffer= XLSX.write(wb,{bookType:'xlsx',type:'array'});
    const data = new Blob([excelBuffer],{type: fileType});
    FileSaver.saveAs(data,'Prueba'+ fileExtension);
    }
        return (
        <div className="card shadow-sm my-2 tablas">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Hora</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {socios.map((socio) => (
                            <tr key={socio.id}>

                                <th scope="row">{socio.id}</th>
                                <td>{socio.nombre}</td>
                                <td>{socio.apellido}</td>
                                <td>{socio.hora_ingreso}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='btn btn-success' onClick={()=>ExportarExcel()}>Exportar a Excel</button>
        </div>
    )
}

export default table