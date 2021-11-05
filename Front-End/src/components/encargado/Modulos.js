import React, { Fragment, useState } from 'react'
import { TablaCRUD } from '../shared/TablaCRUD'
import { AddModulo } from './vistaModulo/AddModulo'
import { BorrarModulo } from './vistaModulo/BorrarModulo'
import { EditarModulo } from './vistaModulo/EditarModulo'
import { VerModulo } from './vistaModulo/VerModulo'

//ESTE ARREGLO DE OBJETOS SE DEBE REEMPLAZAR POR LA RESPUESTA DE 
//LA QUERY QUE OBTIENE LOS MODULOS.
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
const head=[
  {
    id:'nombre',
    label:'Nombre'
  },
  {
    id:'integrantes',
    label:'Nro. Alumnos'
  },
  {
    id:'profesor',
    label:'Profesor'
  },
  
  
]
export const Modulos = () => {

  const [accion, setAccion] = useState('crud');
  const [idModulo, setIdModulo] = useState('sin id');
  
  const CrudModulos = () => {
    return(
      <>
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
            data={ejemploModulos}
            updateAccion = {setAccion}
            updateId = {setIdModulo}
            tipo="Modulo"
          />
        </div>
        
      </>
    ) 
  }
  return (
    <Fragment>
      <div className="card-header">
        <h3 style={{marginLeft:"20px", padding:"10px"}}>Módulos</h3>
      </div>

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
          />
        </>
      }

    </Fragment>
  )
}
