import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { bloques } from '../../../../api/bloques';
import { fetchConToken } from '../../../../helpers/fetch';
import AlertMassage from '../../../shared/AlertMessage';

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  border-left: 7px solid #303E4E;
  justify-content: center;
  padding: 30px;

`;
const Destacado = styled.span`
  background-color: ${props=> props.color};
  color: white;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px; 
`;
export const BoxSolicitud = ({solicitud, reloading}) => {

  const [borrado, setBorrado] = useState(false);
  const [aceptado, setAceptado] = useState(false)
  const dia = solicitud.horario_dia;
  const horaInicio = bloques[solicitud.horario_inicio - 1].hora_inicio
  const horaFin = bloques[solicitud.horario_fin - 1].hora_fin

  const aceptar = async() => {
    setAceptado(false)
    const id = solicitud._id;
    const query = await fetchConToken(
      `clases/aprobar/${id}`,
      {"idSala":solicitud.sala},
      'PUT'
    )
    const res = await query.json()
    console.log(res)
    setAceptado(true)
    reloading()
  }
  const rechazar = async() => {
    setBorrado(false)
    const id = solicitud._id;
    const query = await fetchConToken(
      `clases/${id}`,
      {},
      'DELETE'
    );
    const res = await query.json()
    console.log(res)
    setBorrado(true)
    reloading()
  }
  
  return (
    <Fragment>
      {borrado && (
        <AlertMassage
          message={`La clase ha sido rechazada con éxito!`}
          severity='success'
          setState={setBorrado}
        />
      )}
      {aceptado && (
        <AlertMassage
          message={`La clase ha sido aceptada con éxito!`}
          severity='success'
          setState={setAceptado}
        />
      )}
      <MainBox>
        <div className='row' style={{width:'100%'}}>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Módulo</strong>:</p>
            <span>{solicitud.moduloNombre}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Profesor</strong>:</p>
            <span>{solicitud.profesorName}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Horario</strong>:</p>
            {`${dia} ${horaInicio} - ${horaFin}`}
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Creación</strong>:</p>
            <span>
              fecha
            </span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Sala</strong>:</p>
            <Destacado color='#30624E'>
              {solicitud.salaNombre}
            </Destacado>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Estado</strong>:</p>
            <Destacado color='#A84D61'>
              No Autorizada
            </Destacado>
          </div>
          <div className='col-auto d-flex flex-column gap-1'>
            <button 
              className="btn btn-custom-danger " 
              onClick={rechazar}
            >
              <i className="fa fa-ban"></i>
            </button>
            <button 
              className="btn btn-custom-success" 
              onClick={aceptar}
            >
              <i className="fa fa-check"></i>
            </button>
          </div>
        </div>
      </MainBox>
    </Fragment>
    
    

  )
}
