import React, {useState} from 'react'
import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  boxShadow: 24,
};

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
const diasDefecto = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
]
const profesoresDefecto = [
  {
    nombre:'Armando Barreda​'
  },
  {
    nombre:'Edna Krabappel​'
  },
  {
    nombre:'Profesor Snappe'
  },
  {
    nombre:'Albus Dumbledore'
  },
  {
    nombre:'Profesor Miyagi'
  }
]
const moduloDefecto = {
  nombre:'Defensa contra Artes Oscuras',
  integrantes:20,
  bloque_inicio:{
    dia:"Viernes",
    numero:2,
    hora_inicio:"9:40",
    hora_fin:"10:40"
  },
  bloque_fin:{
    dia:"Viernes",
    numero:3,
    hora_inicio:"10:50",
    hora_fin:"11:50"
  },
  profesor:"Profesor Snappe"
}
export const EditarModulo = ({updateAccion, id}) => {
  
  //QUERY A BD POR EL MODULO ESPECIFICADO POR "id"


  //REEMPLAZAR "moduloDefecto" POR EL MODULO ENTREGADO POR LA QUERY
  const [modulo, setModulo] = useState(moduloDefecto)
  const actualizarModulo = (e) => {
    e.preventDefault()
    console.log("Actualizando objeto...")

    //LOGICA DE QUERY


    //Al terminar la query se cambia a la vista del crud.
    updateAccion('crud')
  }
  
  return (
    <Modal
      open={true}
      onClose={() => updateAccion('crud')}
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
          <h4 className="p-3"> Editar Módulo</h4>
        </div>
        <div className="container" style={{
          paddingRight:"30px",
          paddingLeft:"30px"
        }}>
          <form onSubmit={(e)=>actualizarModulo(e)}>
            <div className="row">
              <h5 className="mt-3 mb-3">Información General</h5>
              <div className="col">
                <label 
                htmlFor="nombre" class="form-label">Nombre</label>
                <input 
                  id="nombre" 
                  name="nombre"
                  type="text" 
                  className="form-control"
                  defaultValue={modulo.nombre}
                />
              </div>
              <div className="col">
                <label htmlFor="integrantes" class="form-label">Integrantes</label>
                <input 
                  id="integrantes" 
                  type="number" 
                  className="form-control"
                  name="integrantes"   
                  defaultValue={modulo.integrantes}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label htmlFor="dia" class="form-label"> Profesor </label>
                <select 
                  id="dia" 
                  type="text" 
                  className="form-select"
                  defaultValue={modulo.profesor}
                >
                  {profesoresDefecto.map((profe,i) => (
                    <option key={i}  value={profe.nombre}>
                      {profe.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div> 
            <div className="row mt-2">
              <h5 className="mt-3 mb-3">Horario</h5>
              <div className="col-6">
                <label htmlFor="dia" class="form-label"> Día</label>
                <select 
                  id="dia" 
                  type="text" 
                  className="form-select"
                  defaultValue={modulo.bloque_inicio.dia}
                >
                  {diasDefecto.map((dia,i) => (
                    <option key={i} value={dia}>
                      {dia}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label htmlFor="bloque_inicio" class="form-label">Bloque Inicio</label>
                <select 
                  id="bloque_inicio" 
                  type="text" 
                  className="form-select"
                  defaultValue={modulo.bloque_inicio.numero}
                >
                  {bloquesDefecto.map((bloque, i) => (
                    <option key={i} value={bloque.numero}>
                      {`${bloque.numero}. ${bloque.hora_inicio} - ${bloque.hora_fin}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="bloque_fin" class="form-label">Bloque Fin</label>
                <select 
                  id="bloque_fin" 
                  type="text" 
                  className="form-select"
                  defaultValue={modulo.bloque_fin.numero}
                >
                  {bloquesDefecto.map((bloque,i) => (
                    <option  key={i}  value={bloque.numero}>
                      {`${bloque.numero}. ${bloque.hora_inicio} - ${bloque.hora_fin}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-auto">
                <button 
                  type="submit" 
                  class="btn btn-custom-primary"
                >
                  Guardar
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
