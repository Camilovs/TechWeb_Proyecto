import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Footer } from '../shared/Footer';
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
export const HomeEnc = () => {

  const [menuSelect, setMenuSelect] = useState('Modulos')
  console.log("menuSelect: ", menuSelect)

  // const MenuItems = ['Modulos', 'Salas'];
  const MenuItems = [
    {
      label:"Modulos",
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
        <div className="col-auto p-0" >
          <SideBar  
            MenuItems = {MenuItems}
            setMenuSelect = {setMenuSelect}
            menuSelected={menuSelect}
          />
        </div>
        <Container className="col">
        
          {(menuSelect==='Modulos') && (
            <Modulos/>
          )}

          {(menuSelect==='Salas') && (
            <Salas/>
          )}
        </Container> 
        
      </div>

      <Footer/>

    </Fragment>
  )
}
