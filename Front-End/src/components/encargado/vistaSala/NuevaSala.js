import React, { useState } from 'react'
import { Backdrop, Fade, Modal,} from '@mui/material'
import { Box } from '@mui/system'
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

export const NuevaSala = ({updateAccion, reload}) => {

  const [sala, setSala] = useState({
    nombre:'',
    aforo:0
  })


  const guardaSala = async (e) => {
    e.preventDefault()
    console.log(sala)
    console.log("Agregando Sala...")
    const resp = await fetchConToken(
      'salas', 
      {"nombre":sala.nombre, "aforo":sala.aforo}, 
      'POST',
      localStorage.getItem('userToken')
    )
    console.log(resp)
    updateAccion('crud')
    reload()
    
  }
  
  const handleInputChange = ({target}) => {
    setSala({
      ...sala,
      [target.name]:target.value
    })
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
          <h4 className="p-3"> Crear Sala</h4>
        </div>
        <div className="container" style={{
          paddingRight:"30px",
          paddingLeft:"30px"
        }}>
          <form onSubmit={(e)=> guardaSala(e)}>
            <div className="row">
              <h5 className="mt-3 mb-3">Información General</h5>
              <div className="col">
                <label 
                htmlFor="nombre" class="form-label">Nombre</label>
                <input 
                  id="nombre" 
                  value={sala.nombre}
                  name="nombre"
                  type="text" 
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="integrantes" class="form-label">Aforo</label>
                <input 
                  id="aforo" 
                  type="number" 
                  value={sala.aforo}
                  className="form-control"
                  name="aforo"
                  onChange={handleInputChange}   
                />
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
