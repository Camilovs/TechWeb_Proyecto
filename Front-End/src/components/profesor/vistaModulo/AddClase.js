import React, { useEffect, useState } from 'react'
import { Fade, Modal, Backdrop } from '@mui/material';
import { Box } from '@mui/system';
import { bloques } from '../../../api/bloques';
import { fetchConToken } from '../../../helpers/fetch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  boxShadow: 24,
};
const diasDefecto = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
]

export const AddClase = (
  {
    addClase, 
    claseNueva, 
    setAddClase,
    setClaseNueva,
    reload,
    modulo
  }
  ) => {

  const [moduloBloqueado, seTmoduloBloqueado] = useState(false)
  const [horarioDisp, setHorarioDisp] = useState(false);

  const [unica, setUnica] = useState(false)
  const [salasDisp, setSalasDisp] = useState([])

  const guardaClase = async (e) => {
    e.preventDefault()
    console.log("Agregando Clase...")
    console.log(claseNueva)
    const query = await fetchConToken(
      'clases',
      claseNueva,
      'POST'
    )
    const resp = await query.json()
    console.log(resp)
    reload()
  }
  
  const handleInputChange = ({target}) => {
    console.log(target.name, ' ',target.value)
    
    if(target.name === 'tipo'){
      if(target.value === 'Unica'){
        setUnica(true)
      }
      else{
        setUnica(false)
      }
    }
    if(target.name === 'sala'){
      const salafind = salasDisp.find( (sala) => sala._id === target.value)
      console.log(salafind)
      setClaseNueva(
        {
          ...claseNueva,
          [target.name]:target.value,
          salaNombre:salafind.nombre
        }
      )
      verificarDisponibilidad(target.value)
    }
    else{
      setClaseNueva({
        ...claseNueva,
        [target.name]:target.value
      })
    }
  }
  const verificarDisponibilidad = async(id) => {
    const data = {
      dia:claseNueva.horario_dia,
      inicio:claseNueva.horario_inicio,
      fin:claseNueva.horario_fin
    }
    console.log(data)
    const query = await fetchConToken(
      `salas/dispHoraria/${id}`,
      data,
      'POST'
    )
    const resp = await query.json()
    console.log(resp)
    setHorarioDisp(resp.ok)
  }
  
  const getNumBloques = () => {
    const bloqueInicio = bloques.find(
      (bloque => bloque.hora_inicio===modulo.horario.hora_inicio)
    )
    const bloqueFin = bloques.find(
      (bloque => bloque.hora_fin===modulo.horario.hora_fin)
    )
    console.log(bloqueInicio, bloqueFin)
    setClaseNueva({
      ...claseNueva,
        horario_dia:modulo.horario.dia,
        horario_inicio:bloqueInicio.numero,
        horario_fin:bloqueFin.numero
    })
  }
  
  
  const getSalasPorAforo = async() => {
    
    const query = await fetchConToken(
      `salas/byaforo/${modulo.integrantes}`,
      {},
      'GET',
    )
    const resp = await query.json()
    if(resp.ok){
      setSalasDisp(resp.salas)
      seTmoduloBloqueado(false)
    }
    else{
      seTmoduloBloqueado(true)
    }
  }
  
  useEffect(() => {
    getSalasPorAforo()
    getNumBloques()
  }, [])

  return (
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
            {moduloBloqueado&&(
              <span>AVISO: No es posible crear una clase para este modulo. No existen salas 
                con aforo suficiente para la cantidad de estudiantes.
              </span>
            )}
            <form onSubmit={(e) => guardaClase(e)}>
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
                    disabled={moduloBloqueado}
                    id='tipo'
                    type="text"
                    name='tipo'
                    className="form-select"
                    aria-label="Default select example"
                    value={claseNueva.tipo}
                    onChange={handleInputChange}
                    
                    >
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
                  Salas Recomendadas
                </label>
                <select 
                  disabled={moduloBloqueado}
                  id='sala'
                  name='sala'
                  value={claseNueva.sala}
                  className="form-select" 
                  aria-label="Default select example"
                  onChange={handleInputChange}
                  >
                  <option selected>Elegir Sala</option>
                  {salasDisp.map((sala, i)=>{
                    return(
                      <option 
                        key={i} 
                        id={sala._id}
                        value={sala._id}
                      >
                        {sala.nombre}
                      </option>
                    )
                  })}
                </select>
                </div>
                {horarioDisp ? (
                  <div className='col align-self-center mt-3'>
                    <div style={{
                      display: 'flex',
                      alignItems:'center',
                      color: '#8BC34A',
                      width: '100%',
                      gap: '10px'
                    }}>
                      <i className='fa fa-check'></i>
                      Horario disponible
                    </div>
                  </div>
                ):(
                  <div className='col align-self-center'>
                    <div style={{
                      display: 'flex',
                      alignItems:'center',
                      color: '#F44336',
                      width: '100%',
                      gap: '10px'
                    }}>
                      <i className='fa fa-ban'></i>
                      Horario No disponible
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <h5 className="mt-3 mb-3">Horario</h5>
                <div className="col-6">
                  <label htmlFor="dia" className="form-label"> Día</label>
                  <select 
                    id="dia"
                    type="text" 
                    className="form-select"
                    disabled= {!unica}
                    name='horario_dia'
                    value={claseNueva.horario_dia}
                    onChange={handleInputChange}
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
                <label htmlFor="horario_inicio" className="form-label">Bloque Inicio</label>
                <select 
                  id="horario_inicio" 
                  type="text" 
                  className="form-select"
                  disabled= {!unica}
                  name='horario_inicio'
                  value={claseNueva.horario_inicio}
                  onChange={handleInputChange}
                >
                  {bloques.map((bloque,i) => (
                    <option  key={i}  value={bloque.numero}>
                      {`${bloque.numero}. ${bloque.hora_inicio} - ${bloque.hora_fin}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="horario_fin" className="form-label">Bloque Fin</label>
                <select 
                  id="horario_fin" 
                  type="text" 
                  className="form-select"
                  disabled= {!unica}
                  name='horario_fin'
                  value={claseNueva.horario_fin}
                  // value={modulo.horario.fin.bloque}
                  onChange={handleInputChange}
                >
                  {bloques.map((bloque,i) => (
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
                  disabled={moduloBloqueado || !horarioDisp}
                  type="submit" 
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
