import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { NavBar } from '../shared/NavBar'
import { SideBar } from '../shared/SideBar';
import { Clases } from './vistaClases/Clases';
import { Estudiantes } from './vistaEstudiante/Estudiantes';
import { Modulos } from './vistaModulo/Modulos'
import { Plantillas } from './vistaPlantilla/Plantillas';
import { Profesores } from './vistaProfesores/Profesores';
import { Salas } from './vistaSala/Salas';
import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      maxHeight: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
      
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  };
});
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECEEF0;
  padding: 0;
  height: 100%;
  min-height: 670px;
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
  const classes = useStyles();
  const [rutasHeader, setRutasHeader] = useState([
    {
      label:"Home",
      icon:'fa fa-plus',
      seccion:"Módulos",
      accion:"crud"
    },
  ]
  )
  
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
    {
      label:"Profesores",
      icon:"fa fa-user-tie"
    },
    {
      label:"Estudiantes",
      icon:"fa fa-user-graduate"
    },
    {
      label:"Clases",
      icon:"fa fa-handshake"
    },
    {
      label:"Plantillas",
      icon:"fa fa-scroll"
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
          <Header />
          <Container>
              {(sideBarSelect==='Módulos') && (
                <Modulos/>
              )}
              {(sideBarSelect==='Salas') && (
                <Salas/>
              )}
              {(sideBarSelect==='Profesores') && (
                
                <div className={classes.page}>
                
                <Profesores/>
              </div>
              )}
              {(sideBarSelect==='Estudiantes') && (
                <div className={classes.page}>
                
                <Estudiantes/>
              </div>

  
                
              )}
              {(sideBarSelect==='Clases') && (
                <Clases/>
              )}
              {(sideBarSelect==='Plantillas') && (
                
                <div className={classes.page}>
                
                <Plantillas/>
              </div>
           
               
                
              )}
          </Container> 
        </Content>   
      </Body>
              
      {/* <Footer/> */}
      
    </Fragment>
  )
}
  