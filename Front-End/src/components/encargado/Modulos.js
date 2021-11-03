import React from 'react'
import styled from 'styled-components'

const BoxModulos = styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;

const ejemploModulos=[
  {
    id:"1234",
    nombre:"Calculo 1",
    integrantes:20,
    profesor:"Pedrito Perez"
  },
  {
    id:"1235",
    nombre:"Calculo 2",
    integrantes:25,
    profesor:"Juan Diaz"
  },
  {
    id:"1236",
    nombre:"Calculo 3",
    integrantes:16,
    profesor:"Bastian Ulloa"
  },
  {
    id:"1237",
    nombre:"Calculo 4",
    integrantes:16,
    profesor:"Bastian Ulloa"
  },
  {
    id:"1238",
    nombre:"Calculo 5",
    integrantes:16,
    profesor:"Bastian Ulloa"
  },
  {
    id:"1239",
    nombre:"Calculo 6",
    integrantes:16,
    profesor:"Bastian Ulloa"
  },
  {
    id:"1239",
    nombre:"Calculo 6",
    integrantes:16,
    profesor:"Bastian Ulloa"
  },
]
export const Modulos = () => {
  return (
    <BoxModulos className="card">
    <div className="card-header">
      <h3 style={{marginLeft:"20px", padding:"10px"}}>Modulos</h3>
    </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" style={{marginBottom:"20px"}}>
              <i className="fa fa-plus" style={{marginRight:"10px"}}></i>
              Agregar
            </button>
          </div>
          <div className="col-3">
            <div className="input-group">
            <span className="input-group-text">
              <i  className="fa fa-search"/>
            </span>
            <input 
              className="form-control"
              placeholder="Buscar..."
              >
            </input>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover ">
            <thead className="table-primary">
            <tr>
              <th scope="col"> Nombre </th>
              <th scope="col"> Nro. Alumnos </th>
              <th scope="col"> Profesor </th>
              <th scope="col"> Acción </th>
            </tr>
            </thead>
            <tbody>
              {ejemploModulos.map( (modulo,i)=>{
                return(
                  <tr key={i}>
                    <td>{modulo.nombre}</td>
                    <td>{modulo.integrantes}</td>
                    <td>{modulo.profesor}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-danger btn-sm">
                          <i className="fa fa-trash-alt"></i>
                        </button>
                        <button className="btn btn-success btn-sm">
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-primary btn-sm">
                          <i className="fa fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              } )}
            </tbody>
          </table>
        </div>
      </div>
    </BoxModulos>
  )
}
