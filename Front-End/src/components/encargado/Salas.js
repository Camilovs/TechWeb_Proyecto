import React ,{ Fragment, useEffect, useState }from 'react'
import { TablaCRUD } from '../shared/TablaCRUD'
import { BorrarSala } from './vistaSala/BorrarSala';
import { EditarSala } from './vistaSala/EditarSala';
import { NuevaSala } from './vistaSala/NuevaSala';
import { VerSala } from './vistaSala/VerSala';
import styled from 'styled-components';
import { fetchConToken } from '../../helpers/fetch';

const Box= styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;

const head = [
  {
    id:'nombre',
    label:'Nombre',
    
  },
  {
    id:'aforo',
    label:'Aforo',
    
  },

];

//ESTE ARREGLO DE DATOS SE REEMPLAZAR POR EL OBTENIDO EN LA QUERY
const datos = [
  {
    id:'1',
    nombre:'Sala 21',
    'aforo':20
  },
  {
    id:'2',
    nombre:'Sala 15',
    'aforo':56
  },
  {
    id:'3',
    nombre:'Lab 1',
    'aforo':78
  },
  {
    id:'4',
    nombre:'Sala 11',
    'aforo':32
  },
  {
    id:'5',
    nombre:'Sala 10',
    'aforo':61
  },
  {
    id:'6',
    nombre:'Sala 1',
    'aforo':65
  },
  {
    id:'7',
    nombre:'Sala 1',
    'aforo':65
  },
  {
    id:'8',
    nombre:'Sala 1',
    'aforo':65
  },
  {
    id:'9',
    nombre:'Sala 1',
    'aforo':65
  }

];
export const Salas = () => {

  const [accion, setAccion] = useState('crud');
  const [reloadTable, setReloadTable] = useState(true)
  const [idSala, setIdSala] = useState('sin id');
  const[salas, setSalas] = useState([]);

  const deleteSala = async(id) => {
    console.log('deleteSala id: ',id)
    const query = await fetchConToken(`salas/${ id }`,{}, 'DELETE')
    console.log(await query.json())
    reload()
  }
  
  

  const reload = () => {
    setReloadTable(!reloadTable);
  }
  

  useEffect( async() => {
    const query = await fetchConToken(
      'salas', 
      {}, 
      'GET'
    )
    const resp = await query.json();
    setSalas(resp.salas)

  }, [reloadTable])
  const CrudSalas = () => {
    return (
      <Box className="card">
        <div className="card-header">
          <h3 style={{marginLeft:"20px", padding:"10px"}}>Salas</h3>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <button 
                className="btn btn-custom-primary" 
                style={{marginBottom:"20px"}}
                onClick={()=>setAccion('agregar')}
              >
                <i className="fa fa-plus" style={{marginRight:"10px"}}></i>
                Agregar
              </button>
            </div>
            <div className="col-sm-3 col-md-6 col-lg-3"  style={{marginBottom:"20px"}}>
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
            data={salas}
            updateAccion = {setAccion}
            updateId = {setIdSala}
            tipo='Sala'
            deleteSala={deleteSala}
            setReloadTable = {setReloadTable}
          />
        </div>
      </Box>
    )
  }
  

  return (
    <Fragment>

      {(accion==='crud') && 
        CrudSalas()
      }

      {(accion==='ver') && 
        <VerSala
          updateAccion = {setAccion}
          id = {idSala}
        />
      }

      {(accion==='editar') && 
        <>
          {/* Se renderiza denuevo la tabla al fondo del modal */}
          {CrudSalas()} 
          <EditarSala
            updateAccion = {setAccion}
            id = {idSala}
            reload ={reload}
          />
        </>
      }
      {(accion==='agregar') && 
        <>
          {/* Se renderiza denuevo la tabla al fondo del modal */}
          {CrudSalas()} 
          <NuevaSala 
            updateAccion = {setAccion}
            id = {idSala}
            reload = {reload}
          />
        </>
      }
      
    </Fragment>
  )
}
