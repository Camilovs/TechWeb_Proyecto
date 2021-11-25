import React from 'react'
import styled from 'styled-components';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router';

const HeaderBox = styled.div`
  background-color: #CFCFCF;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

const RutasDefecto = [
  {
    label:"Home",
    icon:'fa fa-plus',
    seccion:"Módulos",
    accion:"crud"
  },
  {
    label:"Modulos",
    icon:'fa fa-plus',
    seccion:"Módulos",
    accion:"crud"
  },
  {
    label:"Calculo 1",
    icon:'fa fa-plus',
    seccion:"Módulos",
    accion:"ver",
    id:"1234"
  },

];
export const Header = ({ Rutas = RutasDefecto, setAccion}) => {
  const history = useHistory();
  const handleClick = (e, accion) => {
    e.preventDefault();
    setAccion(accion)
    console.info('You clicked a breadcrumb.');
  }

  const breadcrumbs = [

    <Link 
      underline="hover" 
      key="1" 
      color="inherit" 
      href="/" 
      onClick={handleClick}>
      MUI
    </Link>,

    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,

    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];
  return (
    <HeaderBox>
      <Stack spacing={2} style={{marginLeft:"20px"}}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {Rutas.map((ruta,i)=>(
          <Link 
            underline="hover" 
            key={i} 
            color="inherit" 
            onClick={(e)=>handleClick(e, ruta.accion)}
            style={{cursor:"pointer"}}
          >
            {ruta.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
    </HeaderBox>
  )
}
