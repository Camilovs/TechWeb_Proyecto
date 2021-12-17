import React, { Fragment, useEffect, useState } from 'react'
import { Backdrop, Fade, Modal,} from '@mui/material'
import { Box } from '@mui/system'
import { fetchConToken } from '../../../helpers/fetch';
import AlertMassage from '../../shared/AlertMessage';

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
  email:''
};
export const AddEstudiante = ({setModalAdd, reload}) => {
  
  const [newAlumno, setNewAlumno] = useState(initialState);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [guardado, setGuardado] = useState(false)
  const guardarEstudiante= async(e) => {
    setGuardado(false)
    e.preventDefault()
    const pass=newAlumno.email.split('@');
    const body = {
      ...newAlumno,
      pass:pass[0], //Contrasenia primera parte del correo
    }
    const query = await fetchConToken(
      'usuarios/newalumno',
      body,
      'POST'
    );
    const resp = await query.json();
    console.log(resp)
    if(resp.ok){
      setGuardado(true)
      setModalAdd(false)
      reload()
    }
    else{
      setError(true)
      if(resp.errors){
        setMsgError('Hubo un error, consulta con tu administrador')
      }
      else{
        setMsgError(resp.msg)
        
      }
    }
    // updateAccion('crud')
  }
  const handleInputChange = ({target}) => {
    setNewAlumno({
      ...newAlumno,
      [target.name]:target.value
    })
  }

  return (

    <Fragment>
      {error && (
        <AlertMassage
          message={msgError}
          severity='error'
          setState={setError}
        />
      )} 
      {guardado && (
        <AlertMassage
          message='Alumno guardado con éxito!'
          severity='success'
          setState={setGuardado}
        />
      )} 
      <Modal
        open={true}
        onClose={()=>setModalAdd(false)}
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
            <h4 className="p-3"> Crear Estudiante</h4>
          </div>
          <div className="container" style={{
            paddingRight:"30px",
            paddingLeft:"30px"
          }}>
            <form onSubmit={(e)=> guardarEstudiante(e)}>
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
                    value={newAlumno.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="integrantes" className="form-label">Correo</label>
                  <input 
                    id="integrantes" 
                    type="email" 
                    className="form-control"
                    name="email"   
                    value={newAlumno.correo}
                    onChange={handleInputChange}
                  />
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
      
    </Fragment>

  )
}
