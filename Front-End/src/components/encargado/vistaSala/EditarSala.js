import React, { useEffect, useState } from 'react'
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

const salaDefecto = {
  nombre:"Sala 10",
  aforo:10
};

export const EditarSala = ({updateAccion, id, reload}) => {

   //QUERY A BD POR LA SALA ESPECIFICADA POR "id"
  //REEMPLAZAR "salaDefecto" POR EL MODULO ENTREGADO POR LA QUERY
  const [sala, setSala] = useState({})
  console.log(sala)
  const actualizarSala = async (e) => {
    e.preventDefault()
    console.log("Actualizando Sala...")

    //LOGICA DE QUERY
    const query = await fetchConToken(
      `salas/${id}`,
      {'nombre':sala.nombre, 'aforo':sala.aforo},
      'PUT'
    )
    const resp  = await query.json();
    console.log(resp)

    //Al terminar la query se cambia a la vista del crud.
    reload()
    updateAccion('crud')
  }
  const handleInputChange = ({target}) => {
    setSala({
      ...sala,
      [target.name]:target.value
    })
  }

  useEffect(async() => {
    
    const query = await fetchConToken(`salas/${id}`,{},'GET');
    const resp = await query.json();
    console.log(resp)
    setSala(resp.sala);
    
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
          <h4 className="p-3"> Editar Sala</h4>
        </div>
        <div className="container" style={{
          paddingRight:"30px",
          paddingLeft:"30px"
        }}>
          <form onSubmit={(e)=> actualizarSala(e)}>
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
                  value={sala.nombre}
                  onChange={handleInputChange}

                />
              </div>
              <div className="col">
                <label htmlFor="integrantes" class="form-label">Aforo</label>
                <input 
                  id="aforo" 
                  type="aforo" 
                  className="form-control"
                  name="aforo"  
                  value={sala.aforo}
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
