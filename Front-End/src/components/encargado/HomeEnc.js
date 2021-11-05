import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Footer } from '../shared/Footer';
// import { NavBar } from '../shared/NavBar_OLD'
import { NavBar } from '../shared/NavBar'
import { SideBar } from '../shared/SideBar';
import { Modulos } from './Modulos'
import { Salas } from './Salas';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #BABABA;
  padding: 0;
  height: 88.5vh;
`;
const Box= styled.div`
  width: 98%;
  height: 95%;
  background-color: white;
`;
export const HomeEnc = () => {

  const [menuSelect, setMenuSelect] = useState('Módulos')
  console.log("menuSelect: ", menuSelect)

  const MenuItems = [
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

      <div className="row m-0">
        <div className="col-sm-2  p-0" >
          <SideBar  
            MenuItems = {MenuItems}
            setMenuSelect = {setMenuSelect}
            menuSelected={menuSelect}
          />
        </div>
        <Container className="col-sm-10 ">
          <Box className="card">
            {(menuSelect==='Módulos') && (
              <Modulos/>
            )}
            {(menuSelect==='Salas') && (
              <Salas/>
            )}
          </Box>
        </Container> 
        
      </div>

      <Footer/>

    </Fragment>
  )
}
