import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { NavBar } from '../shared/NavBar'
import { SideBar } from '../shared/SideBar';
import { Modulos } from './Modulos'
import { Salas } from './Salas';

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
export const HomeEnc = () => {

  const [rutasHeader, setRutasHeader] = useState([
    {
      label:"Home",
      icon:'fa fa-plus',
      seccion:"Módulos",
      accion:"crud"
    },
  ]
  )
  const [accion, setAccion] = useState('crud');
  const [sideBarSelect, setSideBarSelect] = useState('Módulos')

  console.log("sideBarSelect: ", sideBarSelect)

  const SideBarItems = [
    {
      label:"Módulos",
      icon:"fa fa-archive"
    },
    {
      label:"Salas",
      icon:"fa fa-university"
    },
  ]
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
              {(sideBarSelect==='Salas') && (
                <Salas/>
              )}
          </Container> 
        </Content>   
      </Body>

      <Footer/>
      
    </Fragment>
  )
}
