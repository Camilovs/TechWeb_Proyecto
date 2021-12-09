import React, { useState } from "react";
import Layout from "./components/Layout";

import { Instituciones } from "./pages/Instituciones";

import { GestionUsuarios } from "./pages/usuarios/GestionUsuarios";

export const DashboardAdmin = () => {
  const [estado, setestado] = useState("GestionUsuarios");

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

  return (
    <div>
      <Layout funcionVista={cambiarVista} children={seleccionarVista()} />
    </div>
  );
};
