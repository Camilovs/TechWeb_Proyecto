import moment from 'moment';
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import styled from 'styled-components';
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'moment/locale/es-mx'
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
localizer.format()

const init = new Date(0,0,0,8,30,0);
const end = new Date(0,0,0,22,20,0)
export const VerSala = ({updateAccion, id}) => {
  return (
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
          events={Clases}
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
    
  )
}
