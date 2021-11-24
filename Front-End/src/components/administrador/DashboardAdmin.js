import React, { useState } from "react";
import Layout from "./components/Layout";
import { Modulos } from "./pages/Modulos";
import { Plantillas } from "./pages/Plantillas";
import { Salas } from "./pages/Salas";

import { GestionUsuarios } from "./pages/usuarios/GestionUsuarios";

export const DashboardAdmin = () => {
  const [estado, setestado] = useState("Estudiantes");

  const cambiarVista = (vista) => {
    setestado(vista);
    console.log(vista);
  };

  const seleccionarVista = () => {
    return estado === "GestionUsuarios" ? (
      <GestionUsuarios />
    ) : estado === "Salas" ? (
      <Salas />
    ) : estado === "Plantillas" ? (
      <Plantillas />
    ) : (
      <Modulos />
    );
  };

  return (
    <div>
      <Layout funcionVista={cambiarVista} children={seleccionarVista()} />
    </div>
  );
};
