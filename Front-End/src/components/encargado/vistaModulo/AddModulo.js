import React, { useEffect, useState } from 'react'
import { Backdrop, Fade, Modal,} from '@mui/material'
import { Box } from '@mui/system'
import { fetchConToken } from '../../../helpers/fetch';
import { bloques } from '../../../api/bloques';
import { dias } from '../../../api/dias';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'white',
  boxShadow: 24,
};

const initialState = {
  nombre:'',
  integrantes:0,
  bloque_inicio:{
    dia:"Lunes",
    numero:0,
  },
  bloque_fin:{
    dia:"Lunes",
    numero:0,
  },
  profesor:''
}

export const AddModulo = ({updateAccion, reload, dataModulo = initialState}) => {
  const [profesores, setProfesores] = useState([]);

  const [modulo, setModulo] = useState(dataModulo)

  const guardarModulo = async(e) => {
    e.preventDefault()
    console.log("Agregando objeto...", modulo)
    const query = await fetchConToken(
      'modulos',
      modulo,
      'POST'
    );
    const resp = await query.json();
    console.log(resp)
    updateAccion('crud')
    reload()
  }
  const handleInputChange = ({target}) => {
    if(target.name === 'integrantes'){
      setModulo({
        ...modulo,
        [target.name]:parseInt(target.value)
      })
    }
    else{
      setModulo({
        ...modulo,
        [target.name]:target.value
      })
    }
  }
  const handleDiaChange = ({target}) => {
    setModulo({
      ...modulo,
      bloque_fin:{
        ...modulo.bloque_fin,
        dia:target.value
      },
      bloque_inicio:{
        ...modulo.bloque_inicio,
        dia:target.value
      }
    })
  }
  const handleBloqueChange = ({target}) => {
    if(target.name==='bloque_inicio'){
      setModulo({
        ...modulo,
        bloque_inicio:{
          ...modulo.bloque_inicio,
          numero:parseInt(target.value)-1
        }
      })
    }else{
      setModulo({
        ...modulo,
        bloque_fin:{
          ...modulo.bloque_fin,
          numero:parseInt(target.value)-1
        }
      })
    }

  }
  useEffect( async() => {
    const query = await fetchConToken(
      'usuarios/profesores',
      {},
      'GET'
    )
    const resp = await query.json();
    console.log(resp)
    if(resp.ok){
      setProfesores(resp.profesores)
    }
  }, [])
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
          <h4 className="p-3"> Crear Módulo</h4>
        </div>
        <div className="container" style={{
          paddingRight:"30px",
          paddingLeft:"30px"
        }}>
          <form onSubmit={(e)=> guardarModulo(e)}>
            <div className="row">
              <h5 className="mt-3 mb-3">Información General</h5>
              <div className="col">
                <label 
                htmlFor="nombre" className="form-label">Nombre</label>
                <input 
                  id="nombre" 
                  name="nombre"
                  type="text" 
                  className="form-control"
                  value={modulo.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="integrantes" className="form-label">Integrantes</label>
                <input 
                  id="integrantes" 
                  type="number" 
                  className="form-control"
                  name="integrantes"   
                  value={modulo.integrantes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label htmlFor="profesor" className="form-label"> Profesor </label>
                <select 
                  id="profesor" 
                  type="text" 
                  className="form-select"
                  name='profesor'
                  value={modulo.profesor}
                  onChange={handleInputChange}
                >
                  <option value=''>
                    Elegir Profesor
                  </option>
                  {profesores.map((profe, i) => (
                    <option key={i} value={profe._id}>
                      {profe.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div> 
            <div className="row mt-2">
              <h5 className="mt-3 mb-3">Horario</h5>
              <div className="col-6">
                <label htmlFor="dia" className="form-label"> Día</label>
                <select 
                  id="dia" 
                  type="text" 
                  className="form-select"
                  name='dia'
                  onChange={handleDiaChange}
                  value={modulo.bloque_inicio.dia}
                >
                  {dias.map((dia, i) => (
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
                  onChange={handleBloqueChange}
                  value={bloques[modulo.bloque_inicio.numero].numero}
                >
                  {bloques.map((bloque,i) => (
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
                  onChange={handleBloqueChange}
                  value={bloques[modulo.bloque_fin.numero].numero}
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
                  type="submit" 
                  className="btn btn-custom-primary"
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
