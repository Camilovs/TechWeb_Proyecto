import React from 'react'
import styled from 'styled-components';
import { BoxSolicitud } from './BoxSolicitud';

const BoxSolicitudes = styled.div`
  height: 100%;
  
`;
export const Solicitudes = () => {
  return (
    <BoxSolicitudes>
      <BoxSolicitud/>
    </BoxSolicitudes>
  )
}
