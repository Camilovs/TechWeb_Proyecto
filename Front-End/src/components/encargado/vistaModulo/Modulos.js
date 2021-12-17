import React, { Fragment, useEffect, useState } from 'react'
import { TablaCRUD } from '../../shared/TablaCRUD'
import { AddModulo } from './AddModulo'
import { EditarModulo } from './EditarModulo'
import { VerModulo } from './VerModulos/VerModulo'
import styled from 'styled-components';
import { fetchConToken } from '../../../helpers/fetch'
import { Loading } from '../../shared/Loading'

const Box= styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;

const head=[
  {
    id:'nombre',
    label:'Nombre'
  },
  {
    id:'integrantes',
    label:'Nro. Alumnos'
  },
  
  
]
export const Modulos = () => {

  const [loading, setLoading] = useState(true)
  const [accion, setAccion] = useState('crud');
  const [idModulo, setIdModulo] = useState('sin id');
  const [modulos, setModulos] = useState([])
  const [reloadTable, setReloadTable] = useState(true)

  const deleteModulo = async(id) => {
    console.log('Borrando modulo')
    const query = await fetchConToken(`modulos/${ id }`,{}, 'DELETE')
    console.log(await query.json())
    reload()
  }
  const reload = () => {
    setReloadTable(!reloadTable);
  }
  
  useEffect( async() => {
    const query = await fetchConToken(
      'modulos', 
      {}, 
      'GET'
    )
    const resp = await query.json();
    if(resp.ok){
      setModulos(resp.modulos)
    }
    setLoading(false) 
  }, [reloadTable])
  
  const CrudModulos = () => {
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
            <div className="row">
              <div className="col">
                <button className="btn btn-custom-primary" 
                  style={{marginBottom:"20px"}}
                  onClick={()=>setAccion('agregar')}
                >
                  <i className="fa fa-plus" style={{marginRight:"10px"}}></i>
                  Agregar
                </button>
              </div>
              <div className="col-sm-3 col-md-6 col-lg-3" style={{marginBottom:"20px"}}>
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
            <TablaCRUD
              head={head}
              data={modulos}
              updateAccion = {setAccion}
              updateId = {setIdModulo}
              tipo="Modulo"
              funcionDelete={deleteModulo}
              setReloadTable = {setReloadTable}
            />
          </div>
          
        </Box>
      )}
      </Fragment>
    ) 
  }
  return (
    <Fragment>
     
      {(accion==='crud') &&  
        CrudModulos()
      }

      {(accion==='ver') && 
        <VerModulo 
          updateAccion = {setAccion}
          id = {idModulo}
        />
      }

      {(accion==='editar') && 
        <>
          {/* Se renderiza denuevo la tabla al fondo del modal */}
          {CrudModulos()} 
          <EditarModulo 
            updateAccion = {setAccion}
            id = {idModulo}
            reload={reload}
          />
        </>
      }
      {(accion==='agregar') && 
        <>
          {/* Se renderiza denuevo la tabla al fondo del modal */}
          {CrudModulos()} 
          <AddModulo 
            updateAccion = {setAccion}
            id = {idModulo}
            reload={reload}
          />
        </>
      }

    </Fragment>
  )
}
