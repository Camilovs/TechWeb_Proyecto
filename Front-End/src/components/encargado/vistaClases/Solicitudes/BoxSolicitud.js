import React from 'react'
import styled from 'styled-components';

const Box = styled.div`
  border-radius: 10px;
  background-color: white;
  height: 100px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  border-left: 7px solid #303E4E;
`;
const Destacado = styled.span`
  background-color: ${props=> props.color};
  color: white;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px; 
`;
const Row = styled.div`
  width: 100%
`;

export const BoxSolicitud = ({solicitud}) => {
  return (
    <Box>
      <div className='row' style={{width:'100%'}}>
        <div className='col-2'>
          <p className='mb-2'><strong>Módulo</strong>:</p>
          <span>{solicitud.modulo}</span>
        </div>
        <div className='col-2'>
          <p className='mb-2'><strong>Profesor</strong>:</p>
          <span>{solicitud.profesor}</span>
        </div>
        <div className='col-2'>
          <p className='mb-2'><strong>Horario</strong>:</p>
          <span>{solicitud.horario}</span>
        </div>
        <div className='col-2'>
          <p className='mb-2'><strong>Creación</strong>:</p>
          <span>{solicitud.creacion}</span>
        </div>
        <div className='col-2'>
          <p className='mb-2'><strong>Sala</strong>:</p>
          <Destacado color='#30624E'>
            {solicitud.sala}
          </Destacado>
        </div>
        <div className='col-2'>
          <p className='mb-2'><strong>Estado</strong>:</p>
          <Destacado color='#A84D61'>
            {solicitud.estado}
          </Destacado>
        </div>
      </div>
      
    </Box>
  )
}
