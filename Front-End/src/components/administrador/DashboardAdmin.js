import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { revisarToken } from "../shared/validarUsuario";
import Layout from "./components/Layout";

import { Instituciones } from "./pages/Instituciones";

import { GestionUsuarios } from "./pages/usuarios/GestionUsuarios";

export const DashboardAdmin = () => {
  const [estado, setestado] = useState("GestionUsuarios");
  let history = useHistory();
  const cambiarVista = (vista) => {
    setestado(vista);
    console.log(vista);
  };

  const seleccionarVista = () => {
    return estado === "GestionUsuarios" ? (
      <GestionUsuarios />
    ) : (
      <Instituciones />
    );
  };
  const redirectToOut = () => {
    console.log('redirectout')
    history.push('/')
  }
  
  useEffect(() => {
    async function waitValidate(){

      if(! await revisarToken('Admin')){
        redirectToOut()
      }
    }
    waitValidate()
    // revisarToken()
  }, [])
  return (
    <div>
      <Layout funcionVista={cambiarVista} children={seleccionarVista()} />
    </div>
  );
};
