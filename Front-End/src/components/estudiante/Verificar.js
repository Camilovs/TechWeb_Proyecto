import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchSinToken } from '../../helpers/fetch'
import styled from 'styled-components';
import { FcCheckmark } from "react-icons/fc";
const Box = styled.div`
  border-radius: 10px;
  border: 2px solid lightgray;
  background-color: white;
  padding: 20px;
  
`;
export const Verificar = () => {

  const {id} = useParams()

  const verificarUsuario = async() => {
    const query = await fetchSinToken(
      `auth/validar/${id}`,
      {},
      'PUT'
    )
    const resp = await query.json()
    console.log(resp)
  }
  
  useEffect(() => {
    verificarUsuario()
  }, [])
  return (
    
    <div className="m-0 vh-100 row align-items-center justify-content-center">
      <div className="col-auto p-5">
        <Box className="text-center" >
          <FcCheckmark size={80}/>
          <h4 className="mt-3">Hecho!</h4>
          <hr/>
          <p>Tu cuenta ha sido verificada con éxito</p>
          <p>Puedes proceder a <a href='/'> iniciar sesión.</a></p>
        </Box>
      </div>
    </div>
    
  )
}
