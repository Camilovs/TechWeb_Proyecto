
import React ,{ Fragment, useEffect, useState }from 'react'

import styled from 'styled-components';
import { fetchConToken } from '../../helpers/fetch';
import { Loading } from '../shared/Loading';
import { TablaCRUD } from '../shared/TablaCRUD';
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

export const Modulos = ({accion, setAccion}) => {

  const [loading, setLoading] = useState(true)
  const [semestres, setSemestres] = useState(true)
  const [modulos, setModulos] = useState(true)
  const [reloadTable, setReloadTable] = useState(true)

  const [idModulo, setIdModulo] = useState('sin id');
  const[salas, setSalas] = useState([]);

  useEffect( async() => {
    const querySemestres = await fetchConToken(
      'salas',
      {}, 
      'GET'
    )
    const queryModulos = await fetchConToken(
      'modulos',
      {}, 
      'GET'
    )
    const respSemestres = await querySemestres.json();
    const respModulos = await queryModulos.json();

    setSemestres(respSemestres.salas)
    setModulos(respModulos.modulos)
    console.log(respModulos.modulos)
    setLoading(false) 
  }, [reloadTable])

  const ListModulos = () => {
    return(
      <Fragment>
        {loading ? (
          <Loading/>
        ):(
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
                        {semestres.map( (semestre)=> (
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
                  modulos.map( (modulo) => (
                    <BoxModulo 
                      className="card" 
                      id={modulo._id}
                      onClick={() =>{
                        setAccion('ver')
                        setIdModulo(modulo._id)
                      }}
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
          )}
        </Fragment>
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
