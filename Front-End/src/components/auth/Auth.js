import React, { useState } from 'react'
import styled from 'styled-components';
import { Login } from './Login';
import { Registro } from './Registro';

const ImagenUTAL = styled.div`
  background-image: url("https://i.imgur.com/6KFIM0S.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`
const BoxLogin = styled.div`
  height: auto;
  border-radius: 10px;
  box-shadow:5px 10px 18px #888888;
`
const Fondo = styled.div`
  /* background-color: #959da4; */
  background-color: #303e4e;
  height: 100vh;
  width: 100vw;
`;
export const Auth = () => {

  const [vistaAuth, setVistaAuth] = useState("login");

  const handleChangeVistaAuth = (vista) => {
    setVistaAuth(vista);
    console.log(vistaAuth)
  }
  console.log(vistaAuth)
  return (
    <Fondo>
      <BoxLogin className="container position-absolute top-50 start-50 translate-middle" >
        <div className="row " style={{height:"100%"}}>
          <ImagenUTAL className="col rounded" />
          <div className="col bg-white" >
            {vistaAuth === "login" ? (
              <Login changeVista = {handleChangeVistaAuth}/>
            ):(
              <Registro changeVista = {handleChangeVistaAuth}/>
            )}
            <div style={{marginTop:"100px"}}/>
          </div>   
        </div>
      </BoxLogin>

    </Fondo>
    
  )
}
