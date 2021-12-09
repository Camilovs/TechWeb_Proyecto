import React from 'react'
import styled from 'styled-components';
import { BoxSolicitud } from './BoxSolicitud';

const BoxSolicitudes = styled.div`
  height: 100%;
  padding-bottom: 100px;
`;
const solicitudes = [
  {
    modulo:'Probando Modulo',
    profesor:'Profe Prueba',
    horario:'Martes 8:30 - 10:40',
    creacion:'1/1/2020',
    sala:'Sala 21',
    estado:'No autorizada'
  },
  {
    modulo:'Probando Modulo',
    profesor:'Profe Prueba',
    horario:'Martes 8:30 - 10:40',
    creacion:'1/1/2020',
    sala:'Sala 21',
    estado:'No autorizada'
  },
  {
    modulo:'Probando Modulo',
    profesor:'Profe Prueba',
    horario:'Martes 8:30 - 10:40',
    creacion:'1/1/2020',
    sala:'Sala 21',
    estado:'No autorizada'
  },
  {
    modulo:'Probando Modulo',
    profesor:'Profe Prueba',
    horario:'Martes 8:30 - 10:40',
    creacion:'1/1/2020',
    sala:'Sala 21',
    estado:'No autorizada'
  },
];
export const Solicitudes = () => {
  return (
    <BoxSolicitudes>
      {solicitudes.map( (solicitud, i) => {
        return(
          <BoxSolicitud solicitud={solicitud}
          />
        )
      })}
    </BoxSolicitudes>
  )
}
