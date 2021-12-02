
import React ,{ Fragment, useEffect, useState }from 'react'
import styled from 'styled-components';
import { fetchConToken } from '../../helpers/fetch';
import { Loading } from '../shared/Loading';
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
  const [semestres, setSemestres] = useState([])
  const [modulos, setModulos] = useState([])
  const [reloadTable, setReloadTable] = useState(true)
  const [idModulo, setIdModulo] = useState('sin id');
  const getModulos = async(semestre, name,e) => {
    console.log(e.target.id)
    setLoading(true)
    const queryModulos = await fetchConToken(
      `modulos/bysemestre/${semestre}`,
      {}, 
      'GET'
    )
    const respModulos = await queryModulos.json();
    if(respModulos.ok){
      setModulos(respModulos.modulos)
    }
    setLoading(false) 
  }
  
  useEffect( async() => {
    const querySemestres = await fetchConToken(
      'semestres',
      {}, 
      'GET'
    )
    const respSemestres = await querySemestres.json();
    respSemestres.semestres.map(async(semestre)=>{
      if(semestre.actual){
        const queryModulos = await fetchConToken(
          `modulos/bysemestre/${semestre._id}`,
          {}, 
          'GET'
        )
        const respModulos = await queryModulos.json();
        if(respModulos.ok){
          setModulos(respModulos.modulos)
        }
      }
    })
    setSemestres(respSemestres.semestres)
    setLoading(false) 

  }, [reloadTable])

  const ListModulos = () => {
    return(
      <Fragment>
        <Box className="card">
          <div className="card-header">
            <h3 style={{marginLeft:"20px", padding:"10px"}}>Módulos</h3>
          </div>
          <div className="container mt-5">
            {/* Header */}
            <div className="row">
              <div className="col-sm-3 col-md-6 col-lg-4" style={{marginBottom:"20px"}}>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span>Seleccionar Semestre: </span>
                  </div>
                  <div className="col">
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      onChange={(e)=>{getModulos(e.target.value, e.target.name,e)}}
                    >
                    {semestres.map( (semestre)=> (
                      <option 
                        key={semestre._id} 
                        value={semestre._id} 
                        id={`${semestre.anio}/${semestre.numero}`}
                      >
                        {semestre.anio}/{semestre.numero}
                      </option>
                    ))}
                    </select>
                  </div>
                </div>   
              </div>
            </div>
            <hr style={{margin:0}}/>
            {/* Content */}
            {loading ? (
              <Loading/>
            ):(
              <Fragment>
                {modulos.length===0 ? (
                  <div className='text-center mt-5'>
                    <p ><em>No existen módulos para este semestre</em></p>
                  </div>
                ):(
                  <Fragment>
                    {modulos.map( (modulo, i) => (
                        <BoxModulo 
                          key={i}
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
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </Box> 
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
