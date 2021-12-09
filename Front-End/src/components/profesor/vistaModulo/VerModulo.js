import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components';
import { bloques } from '../../../api/bloques';
import { fetchConToken } from '../../../helpers/fetch';
import { Loading } from '../../shared/Loading';
import { AddClase } from './AddClase';
import { TableAlumnos } from './TableAlumnos';
import { TableClases } from './TableClases';



const MainBox= styled.div`
  width: 94%;
  height: 90%;
  background-color: transparent;
`;

const CardBody = styled.div`
  padding: 20px;
`

export const VerModulo = ({updateAccion, id}) => {
  
  const [addClase, setAddClase] = useState(false)
  const [reloadTable, setReloadTable] = useState(true)
  const [loading, setLoading] = useState(true)
  const [modulo, setModulo] = useState({
    nombre:'',
    integrantes:0,
    profesor:'',
    horario:{
      dia:'',
      hora_inicio:'',
      hora_fin:''
    }
  })
  const [claseNueva, setClaseNueva] = useState({
    modulo:modulo,
    moduloNombre:modulo.nombre,
    tipo:'',
    sala:'',
    salaNombre:'',
    horario:{
      inicio:{
        dia:'',
        bloque:0
      },
      fin:{
        dia:'',
        bloque:0
      }
    },
    aprobada:false,
  })

  const cargarModulo = async(modulo) => {

    console.log("cargando datos: ",modulo)
    const query = await fetchConToken(
      `usuarios/${modulo.profesor}`,
      {},
      'GET'
    )
    const res = await query.json();
    const setmodulo = {
      nombre: modulo.nombre,
      integrantes:modulo.integrantes,
      profesor:res.usuario.nombre,
      horario:{
        dia:modulo.bloque_inicio.dia,
        hora_inicio:bloques[modulo.bloque_inicio.numero].hora_inicio,
        hora_fin:bloques[modulo.bloque_fin.numero].hora_fin
      }
    }

    setModulo(setmodulo)

    setClaseNueva({ 
      ...claseNueva,
      moduloNombre: modulo.nombre,
      modulo: id
    })

    setLoading(false)
  }
  
  useEffect( async() => {
    
    const query = await fetchConToken(
      `modulos/${id}`,
      {},
      'GET'
    );
    const res = await query.json();
    cargarModulo(res.modulo)
  }, [])

  const reload = () => {
    setReloadTable(!reloadTable);
  }
  return (
    <Fragment>
      {addClase && (
        <AddClase
          addClase ={addClase}
          setAddClase = {setAddClase}
          claseNueva = {claseNueva}
          reload = {reload}
          setClaseNueva = {setClaseNueva}
          modulo = {modulo}
        />
      )}
      {loading ? (
        <Loading/>
      ):
      (  
      <MainBox>
        {/* Boton Atras */}
        <div className="row">
          <div className="col-sm">
            <button 
              className="btn btn-custom-primary" 
              style={{marginBottom:"20px"}}
              onClick={()=>updateAccion('lista')}
            >
              <i 
                className="fa fa-arrow-left" 
                style={{marginRight:"10px"}}
              />
              Atras
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row mb-4">
              {/* Card Info General */}
              <div className="col">
                <div className="card">
                  {/* Titulo de la Card */}
                  <div className="card-header p-3">
                  <div className="row align-items-center">
                      <div className="col-auto">
                        <i 
                        className="fa fa-info" 
                        style={{fontSize:17}}
                        />
                      </div>
                      <div className="col-sm  p-0">
                        <h5 className="m-0">Información General</h5>
                      </div>
                    </div>
                  </div>
                  <CardBody>
                    <p>Nombre: {modulo.nombre}</p>
                    <p>Integrantes: {modulo.integrantes}</p>
                    <p>Profesor: {modulo.profesor}</p>
                  </CardBody>
                </div>
              </div>
              {/* Card Horario */}
              <div className="col">
                <div className="card">
                  <div className="card-header p-3">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <i 
                        className="fa fa-calendar-alt" 
                        style={{fontSize:17}}
                        />
                      </div>
                      <div className="col-sm  p-0">
                        <h5 className="m-0">Horario</h5>
                      </div>
                    </div>
                  </div>
                  <CardBody>
                    <p>Dia: {modulo.horario.dia}</p>
                    <p>Hora Inicio: {modulo.horario.hora_inicio}</p>
                    <p>Hora Fin: {modulo.horario.hora_fin}</p>
                  </CardBody>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TableClases 
                  id={id}
                  setAddClase = {setAddClase}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <TableAlumnos id={id}/>
              </div>
            </div>
          </div>
        </div>
        

        {/* Tablas */}
      </MainBox>
      )}
    </Fragment>
  )
}

