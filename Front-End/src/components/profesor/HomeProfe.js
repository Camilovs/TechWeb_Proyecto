import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { Header } from '../shared/Header';
import { NavBar } from '../shared/NavBar'
import styled from 'styled-components';
import { useState } from 'react';
import { SideBar } from '../shared/SideBar';
import { Modulos } from './Modulos';
import { Footer } from '../shared/Footer';
import { useHistory } from 'react-router-dom';
import { revisarToken } from '../shared/validarUsuario';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E4E4E4;
  padding: 0;
  /* height: 88.5vh; */
  height: 100%;
`;

const Body = styled.div`
  height: 100%;
`;

const Content = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
`;

export const HomeProfe = () => {
  let history = useHistory()
  const [accion, setAccion] = useState('lista');
  const [sideBarSelect, setSideBarSelect] = useState('Módulos')

  console.log("sideBarSelect: ", sideBarSelect)

  const SideBarItems = [
    {
      label:"Módulos",
      icon:"fa fa-archive"
    }
  ]
  const redirectToOut = () => {
    console.log('redirectout')
    history.push('/')
  }
  
  useEffect(() => {
    async function waitValidate(){
      if(! await revisarToken('Profesor')){
        redirectToOut()
      }
    }
    waitValidate()
    // revisarToken()
  }, [])
  return (
    <Fragment>
      <NavBar/>
      <Body className="row m-0">
       <div className="col-sm-2 p-0" >
          <SideBar  
            MenuItems = {SideBarItems}
            setMenuSelect = {setSideBarSelect}
            menuSelected={sideBarSelect}
          />
        </div>
        <Content className="col-sm-10 p-0">
          <Header setAccion={setAccion}/>
          <Container>
              {(sideBarSelect==='Módulos') && (
                <Modulos accion={accion} setAccion={setAccion}/>
              )}
          </Container> 
        </Content>   
      </Body>

      {/* <Footer/> */}
    </Fragment>
  )
}
