import moment from 'moment';
import React,{useState,useEffect, Fragment} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import styled from 'styled-components';
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'moment/locale/es-mx'
import { fetchConToken } from '../../../helpers/fetch';
import { bloques } from '../../../api/bloques';
import { Loading } from '../../shared/Loading';
const Box= styled.div`
  width: 98%;
  height: 95%;
  min-height: 650px;
`;

const Clases = [
  {
  title:'Calculo 1',
  start: moment('8:30', 'h:mm').toDate(),
  end: moment('9:40', 'h:mm').toDate(),
  },
  {
  title:'Calculo 2',
  start: moment('10:50', 'h:mm').day(3).toDate(),
  end: moment('13:10', 'h:mm').day(3).toDate(),
  },
]
moment.locale('es-mx')
const localizer = momentLocalizer(moment)

const init = new Date(0,0,0,8,30,0);
const end = new Date(0,0,0,22,20,0);

export const VerSala = ({updateAccion, id}) => {

  const [clases, setClases] = useState([])
  const [loading, setLoading] = useState(true)
  const formatClases = (clasesDB) => {
    console.log(clasesDB)
    const clases = []
    let claseObj = {}
    let hora_inicio = ''
    let hora_fin = ''
    let dia = ''
    clasesDB.map((clase) => {
      hora_inicio = bloques[clase.horario.inicio.bloque].hora_inicio
      hora_fin = bloques[clase.horario.fin.bloque].hora_fin
      dia = clase.horario.inicio.dia
      claseObj = {
        title:clase.moduloNombre,
        start: moment(hora_inicio, 'h:mm').day(getDay(dia)).toDate(),
        end: moment(hora_fin, 'h:mm').day(getDay(dia)).toDate()
      };
      clases.push(claseObj)
    })
    console.log("- :", clases)
    setClases(clases)
    setLoading(false)
  }
  const getDay = (dia) => {
    if(dia==='Lunes'){
      return(1)
    }
    if(dia==='Martes'){
      return(2)
    }
    if(dia==='Miercoles'){
      return(3)
    }
    if(dia==='Jueves'){
      return(4)
    }
    if(dia==='Viernes'){
      return(5)
    }
    if(dia==='Sabado'){
      return(6)
    }
  }
  
  useEffect(async() => {
    
    const query = await fetchConToken(
      `clases/sala/${id}`,
      {},
      'GET'     
    )
    const resp = await query.json()
    // console.log(resp.clases)
    if(resp.clases.length > 0){
      formatClases(resp.clases)
    }
    else{
      setLoading(false)
    }
    
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ):(
        <Box className="card">
          <div className="card-header">
            <div className="row justify-content-center">
              <div className="col-auto align-self-center">
                <button 
                  className="btn btn-custom-primary" 
                  onClick={()=>updateAccion('crud')}
                >
                  <i className="fa fa-arrow-left" ></i>
                </button>
              </div>
              <div className="col align-items-center">
                <h3 style={{padding:"10px"}}>Bloques ocupados</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Calendar 
              localizer={localizer}
              events={clases}
              view='week'
              views={['week']}
              timeslots={1}
              step={70}
              min={init}
              max={end}
              toolbar={false}
            />
          </div>
        </Box>
      )}
    </Fragment>
    
  )
}
