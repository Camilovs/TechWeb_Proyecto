import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchConToken } from '../../../../helpers/fetch';
import { Loading } from '../../../shared/Loading';
import { BoxSolicitud } from './BoxSolicitud';

const BoxSolicitudes = styled.div`
  height: 100%;
  padding-bottom: 100px;
`;

const NoExistenSolicitudes = styled.span`
  
  font-style: italic;
  display: flex;
  justify-content:center;
`;
// const solicitudes = [
//   {
//     modulo:"617d589e887de7aac2580172",
//     moduloNombre:"Calculo 2",
//     tipo:"Recurrente",
//     sala:"618c6b93a35a1e4a21539ab3",
//     salaNombre:"Sala 49",
//     aprobada:false,
//     horario_dia:"Lunes",
//     horario_inicio:1,
//     horario_fin:2,
//     profesorName:"profe"
//   },
// ];
export const Solicitudes = () => {

  const [soliciudesList, setSolicitudes] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)

  const getSolicitudes = async() => {
    const query = await fetchConToken(
      "clases/solicitudes",
      {},
      'GET'
    )
    const resp = await query.json();
    console.log(resp.solicitudes)
    setSolicitudes(resp.solicitudes)
    setLoading(false)
  }
  
  const reloading = () => {
    setReload(!reload)
  }
  

  useEffect(() => {
    
    getSolicitudes()

  }, [reload])

  return (
    <BoxSolicitudes>
      {loading ? (
        <Loading/>
      ):(
        <Fragment>
          {soliciudesList.length > 0 ? (
            <Fragment>
              {soliciudesList.map( (solicitud, i) => {
                return(
                  <BoxSolicitud 
                    key={i} 
                    solicitud={solicitud}
                    reloading = {reloading}
                  />
                )
              })}
            </Fragment>
          ):(
            <NoExistenSolicitudes>
              No hay solicitudes registradas
            </NoExistenSolicitudes>
          )}
        </Fragment>
      )}
    </BoxSolicitudes>
  )
}
