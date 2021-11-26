import React, { useState } from 'react'
import styled from 'styled-components';
import { AsignarSala } from './AsignarSala';
import { Solicitudes } from './Solicitudes/Solicitudes';

const Box= styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;

export const Clases = () => {

  const [tabSeleccion, setTabSeleccion] = useState('solicitudes');
  
  return (
    <Box className="card">
      <div className="card-header">
        <h3 style={{marginLeft:"20px", padding:"10px"}}>Clases</h3>
      </div>
      <div className="container mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <span 
              className={`
                nav-link ${tabSeleccion === 'solicitudes' && 'active'}`
              }
              onClick={()=>setTabSeleccion('solicitudes')}
              style={{
                cursor: 'pointer'
              }}
            >
              Solicitudes
            </span>
          </li>
          <li className="nav-item">
            <span 
              className={`
                nav-link ${tabSeleccion === 'asignar' && 'active'}`
              }
              onClick={()=>setTabSeleccion('asignar')}
              style={{
                cursor: 'pointer'
              }}
            >
              Asignar Salas
            </span>
          </li>
        </ul>
        {tabSeleccion === 'solicitudes' ? (
          <Solicitudes/>
        ):(
          <AsignarSala/>
        )}
      </div>


    </Box>
  )
}
