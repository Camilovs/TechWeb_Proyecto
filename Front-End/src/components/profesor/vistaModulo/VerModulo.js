import { Fade, Modal, Backdrop } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { TableAlumnos } from './TableAlumnos';
import { TableClases } from './TableClases';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  boxShadow: 24,
};

const MainBox= styled.div`
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

const diasDefecto = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
]
const bloquesDefecto = [
  {
    numero:1,
    hora_inicio:"8:30",
    hora_fin:"9:30"
  },
  {
    numero:2,
    hora_inicio:"9:40",
    hora_fin:"10:40"
  },
  {
    numero:3,
    hora_inicio:"10:50",
    hora_fin:"11:50"
  },
]
export const VerModulo = ({updateAccion, id}) => {

  const [addClase, setAddClase] = useState(false)

  const modalAddClase = () => {
    return(
      <Modal
        open={true}
        onClose={() => setAddClase(!addClase)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={true}>
        <Box sx={style} className="card">
          <div className="card-header">
            <h4 className="p-3"> Solicitud de nueva Reunión</h4>
          </div>
          <div className="container" style={{
            paddingRight:"30px",
            paddingLeft:"30px"
          }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <h5 className="mt-3 mb-3">Información General</h5>
                <div className="col-auto">
                <label 
                  htmlFor="tipo" 
                  className="form-label"
                >
                  Tipo
                </label>
                <select 
                  id='tipo'
                  className="form-select" 
                  aria-label="Default select example">
                  <option selected>Tipo</option>
                  <option >Recurrente</option>
                  <option >Unica</option>
                </select>
                </div>
                <div className="col-auto">
                <label 
                  htmlFor="sala" 
                  className="form-label"
                >
                  Sala
                </label>
                <select 
                  id='sala'
                  className="form-select" 
                  aria-label="Default select example">
                  <option selected>Elegir Sala</option>
                  <option >Sala 1</option>
                  <option >Sala 2</option>
                </select>
                </div>
              </div>
              <div className="row">
                <h5 className="mt-3 mb-3">Horario</h5>
                <div className="col-6">
                  <label htmlFor="dia" className="form-label"> Día</label>
                  <select 
                    id="dia" 
                    type="text" 
                    className="form-select"
                    name='dia'
                    // onChange={handleDiaChange}
                    // value={modulo.bloque_inicio.dia}
                  >
                    {diasDefecto.map((dia, i) => (
                      <option key={i} value={dia}>
                        {dia}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-2">
              <div className="col">
                <label htmlFor="bloque_inicio" className="form-label">Bloque Inicio</label>
                <select 
                  id="bloque_inicio" 
                  type="text" 
                  className="form-select"
                  name='bloque_inicio'
                  // onChange={handleBloqueChange}
                  // value={bloquesDefecto[modulo.bloque_inicio.numero].numero}
                >
                  {bloquesDefecto.map((bloque,i) => (
                    <option  key={i}  value={bloque.numero}>
                      {`${bloque.numero}. ${bloque.hora_inicio} - ${bloque.hora_fin}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="bloque_fin" className="form-label">Bloque Fin</label>
                <select 
                  id="bloque_fin" 
                  type="text" 
                  className="form-select"
                  name='bloque_fin'
                  // onChange={handleBloqueChange}
                  // value={bloquesDefecto[modulo.bloque_fin.numero].numero}
                >
                  {bloquesDefecto.map((bloque,i) => (
                    <option key={i}  value={bloque.numero}>
                      {`${bloque.numero}. ${bloque.hora_inicio} - ${bloque.hora_fin}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-auto">
                <button 
                  // type="submit" 
                  className="btn btn-custom-primary"
                >
                  Enviar
                </button>
              </div>
            </div>
            </form>  
          </div>
        </Box>
      </Fade>
      </Modal>
    )
  }
  

  return (
    <Fragment>
      {addClase && (
        modalAddClase()
      )}
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
                    <p>Nombre: Nombre modulo</p>
                    <p>Integrantes: 20</p>
                    <p>Profesor: Nombre Profesor</p>
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
                    <p>Día: Martes</p>
                    <p>Bloque Inicio: 1. 8.30 - 9.30</p>
                    <p>Bloque Final: 2. 9.40 - 10.40</p>
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

    </Fragment>
  )
}
