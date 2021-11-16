import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { VerModulo } from './vistaModulo/VerModulo';

const Box= styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;
const BoxModulo = styled.div`
  box-shadow: 10px 5px 10px #DDDDDD;
  margin-top: 12px;
  cursor: pointer;
  color: #475c74;
  :hover{
    background-color: #F0F0F0;
  }
`;

const modulosDefault = [
  {
    nombre:"Modulo 1",
    _id:1
  },
  {
    nombre: "Modulo 2",
    _id:2
  },
  {
    nombre:"Modulo 3",
    _id:3
  }
];

const semestresDefault = [
  {
    nombre:'Semestre 1',
    _id:1
  },
  {
    nombre:'Semestre 2',
    _id:2
  },
  {
    nombre:'Semestre 3',
    _id:3
  },
  {
    nombre:'Semestre 4',
    _id:4
  },
];



export const Modulos = ({accion, setAccion}) => {

  const [idModulo, setIdModulo] = useState('sin id');
  // const [modulos, setModulos] = useState([])

  const ListModulos = () => {
    return(
      <Box className="card">
          <div className="card-header">
            <h3 style={{marginLeft:"20px", padding:"10px"}}>Módulos</h3>
          </div>
          <div className="container mt-5">
            {/* Header */}
            <div className="row">
              <div className="col">
                <h4>Semestre X</h4>
              </div>
              <div className="col-sm-3 col-md-6 col-lg-4" style={{marginBottom:"20px"}}>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span>Seleccionar Semestre: </span>
                  </div>
                  <div className="col">
                    <select class="form-select" aria-label="Default select example">
                    <option selected>Semestre</option>
                    {semestresDefault.map( (semestre)=> (
                      <option value={semestre._id}>{semestre.nombre}</option>
                    ))}
                    </select>
                  </div>
                </div>   
              </div>
            </div>
            <hr style={{margin:0}}/>
            {/* Content */}
            {
              modulosDefault.map( (modulo) => (
                <BoxModulo 
                  className="card" 
                  id={modulo._id}
                  onClick={() =>setAccion('ver')}
                >
                  <div className="card-body" id={modulo._id}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i className="fa fa-book fa-2x"/>
                    </div>
                    <div className="col">
                      <h3 style={{marginTop:'8px'}} 
                        id={modulo._id}
                      >
                        {modulo.nombre}
                      </h3>
                    </div>
                  </div>
  
                  </div>
                </BoxModulo>
              ))
            }
          </div>
          
        </Box>
    )
    
  }

  return (
    <Fragment>

      {(accion==='ver')  && 
        <VerModulo
          updateAccion = {setAccion}
          id = {idModulo}
        />
      }
      {(accion==='lista')  && 
        ListModulos()
      }
    </Fragment>
  )
}
