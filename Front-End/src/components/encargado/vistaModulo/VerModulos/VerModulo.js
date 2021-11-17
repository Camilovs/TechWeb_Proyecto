import React from 'react'
import styled from 'styled-components';
import { TableAlumnos } from './TableAlumnos';
import { TableClases } from './TableClases';

const Box= styled.div`
  width: 94%;
  height: 90%;
  /* margin: 50px;
  margin-top: 50px;
  margin-bottom: 50px; */
  background-color: transparent;
  /* background-color: black */
`;
const CardBody = styled.div`
  padding: 20px;
`

export const VerModulo = ({updateAccion, id}) => {

  return (
    <Box>
      {/* Boton Atras */}
      <div className="row">
        <div className="col-sm">
          <button 
            className="btn btn-custom-primary" 
            style={{marginBottom:"20px"}}
            onClick={()=>updateAccion('crud')}
          >
            <i className="fa fa-arrow-left" style={{marginRight:"10px"}}></i>
            Atras
          </button>
        </div>
      </div>
      {/* Cards */}
      <div className="row mb-4">
        <div className="col-sm-3">
          <div className="card">
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
              <p>Nombre: Bla Bla</p>
              <p>Integrantes: 20</p>
              <p>Profesor: Armando Barrera</p>
            </CardBody>
          </div>
        </div>
        <div className="col-sm-3">
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
              <p>Nombre: Bla Bla</p>
              <p>Integrantes: 20</p>
              <p>Profesor: Armando Barrera</p>
            </CardBody>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <TableAlumnos id={id}/>
        </div>
        <div className="col-sm-6">
          <TableClases id={id}/>
        </div>
      </div>
    </Box>
  )
}
