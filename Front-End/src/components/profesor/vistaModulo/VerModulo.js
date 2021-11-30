import { Fade, Modal, Backdrop } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components';
import { bloques } from '../../../api/bloques';
import { fetchConToken } from '../../../helpers/fetch';
import { Loading } from '../../shared/Loading';
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
  console.log(id)

  const [addClase, setAddClase] = useState(false)

  const [loading, setLoading] = useState(true)
  const [modulo, setModulo] = useState({
    nombre:'',
    integrantes:0,
    profesor:'',
    horario:{
      dia:'',
      hora_inicio:'',
      hora_fin:''
    }
  })
  const cargarModulo = async(modulo) => {
    console.log("cargando datos: ",modulo)
    const query = await fetchConToken(
      `usuarios/${modulo.profesor}`,
      {},
      'GET'
    )
    const res = await query.json();
    const setmodulo = {
      nombre: modulo.nombre,
      integrantes:modulo.integrantes,
      profesor:res.usuario.nombre,
      horario:{
        dia:modulo.bloque_inicio.dia,
        hora_inicio:bloques[modulo.bloque_inicio.numero].hora_inicio,
        hora_fin:bloques[modulo.bloque_fin.numero].hora_fin
      }
    }
    setModulo(setmodulo)
    setClaseNueva({ 
      ...claseNueva,
      moduloNombre: modulo.nombre,
      modulo: id
    })
    setLoading(false)
  }

  useEffect( async() => {
    
    const query = await fetchConToken(
      `modulos/${id}`,
      {},
      'GET'
    );
    const res = await query.json();
    // console.log(res)
    cargarModulo(res.modulo)
  }, [])

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
                  Sala
                </label>
                <select 
                  id='salaNombre'
                  name='salaNombre'
                  value={claseNueva.salaNombre}
                  className="form-select" 
                  aria-label="Default select example"
                  onChange={handleInputChange}
                  >
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
                    value={claseNueva.horario.inicio.dia}
                    // onChange={handleDiaChange}
                    // value={modulo.bloque_inicio.dia}
                    onChange={handleDiaChange}
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
                  value={claseNueva.horario.inicio.bloque}
                  onChange={handleBloqueChange}
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
                  value={claseNueva.horario.fin.bloque}
                  onChange={handleBloqueChange}
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

  

  const [reloadTable, setReloadTable] = useState(true)
  const reload = () => {
    setReloadTable(!reloadTable);
  }

  const [claseNueva, setClaseNueva] = useState({
    modulo:modulo,
    moduloNombre:modulo.nombre,
    tipo:'',
    sala:'',
    salaNombre:'',
    horario:{
      inicio:{
        dia:'',
        bloque:0
      },
      fin:{
        dia:'',
        bloque:0
      }
    },
    aprobada:false,
  })

  const handleInputChange = ({target}) => {
    setClaseNueva({
      ...claseNueva,
      [target.name]:target.value
      
    })
    console.log(target.name)
    console.log(target.value)
  }

  const handleDiaChange = ({target}) => {
    setClaseNueva({
      ...claseNueva,
      horario:{
        inicio:{
          ...claseNueva.horario.inicio,
          dia:target.value
        },
        fin:{
          ...claseNueva.horario.fin,
          dia:target.value
        }
      }
    })
  }
  const handleBloqueChange = ({target}) => {
    if(target.name==='bloque_inicio'){
      setClaseNueva({
        ...claseNueva,
        horario:{
          ...claseNueva.horario,
          inicio:{
            ...claseNueva.horario.inicio,
            bloque:target.value
          }
        }})
    }else{
      setClaseNueva({
        ...claseNueva,
        horario:{
          ...claseNueva.horario,
          fin:{
            ...claseNueva.horario.fin,
            bloque:target.value
          }
        }})

  }}

  const guardaClase = async (e) => {
    e.preventDefault()
    console.log("Agregando Clase...")
    console.log(claseNueva)
    /*const resp = await fetchConToken(
      'clases', 
      {
      "horario":claseNueva.horario,
      "modulo":claseNueva.modulo,
      "moduloNombre":claseNueva.moduloNombre,
      "tipo":claseNueva.tipo,
      "aprobada":claseNueva.aprobada,
      "sala":claseNueva.sala,
      "salaNombre": claseNueva.salaNombre
      
      }, 
      'POST',
      localStorage.getItem('userToken')
    )
    console.log(resp)*/
    reload()
  }
  

  return (
    <Fragment>
      {addClase && (
        modalAddClase()
      )}
      {loading ? (
        <Loading/>
      ):
      (  
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
                    <p>Nombre: {modulo.nombre}</p>
                    <p>Integrantes: {modulo.integrantes}</p>
                    <p>Profesor: {modulo.profesor}</p>
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
                    <p>Dia: {modulo.horario.dia}</p>
                    <p>Bloque Inicio: {modulo.horario.hora_inicio}</p>
                    <p>Bloque Final: {modulo.horario.hora_fin}</p>
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
      )}
    </Fragment>
  )
}

