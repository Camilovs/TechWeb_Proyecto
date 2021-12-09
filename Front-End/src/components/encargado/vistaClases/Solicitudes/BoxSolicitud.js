import React from 'react'
import styled from 'styled-components';

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
export const BoxSolicitud = ({solicitud}) => {
  return (
    
    <MainBox>
      
        <div className='row' style={{width:'100%'}}>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Módulo</strong>:</p>
            <span>{solicitud.modulo}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Profesor</strong>:</p>
            <span>{solicitud.profesor}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Horario</strong>:</p>
            <span>{solicitud.horario}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Creación</strong>:</p>
            <span>{solicitud.creacion}</span>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Sala</strong>:</p>
            <Destacado color='#30624E'>
              {solicitud.sala}
            </Destacado>
          </div>
          <div className='col align-self-center'>
            <p className='mb-2'><strong>Estado</strong>:</p>
            <Destacado color='#A84D61'>
              {solicitud.estado}
            </Destacado>
          </div>
          <div className='col-auto d-flex flex-column gap-1'>
            <button 
              className="btn btn-custom-danger " 
            >
              <i className="fa fa-ban"></i>
            </button>
            <button 
              className="btn btn-custom-success" 
            >
              <i className="fa fa-check"></i>
            </button>
          </div>
        </div>
    </MainBox>
    
    

  )
}
