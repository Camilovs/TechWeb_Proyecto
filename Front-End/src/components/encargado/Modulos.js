import React, { Fragment, useEffect, useState } from 'react'
import { TablaCRUD } from '../shared/TablaCRUD'
import { AddModulo } from './vistaModulo/AddModulo'
import { EditarModulo } from './vistaModulo/EditarModulo'
import { VerModulo } from './vistaModulo/VerModulos/VerModulo'
import styled from 'styled-components';
import { fetchConToken } from '../../helpers/fetch'

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
export const Modulos = ({accion, setAccion}) => {

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
    setModulos(resp.modulos)

  }, [reloadTable])
  
  const CrudModulos = () => {
    return(
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
