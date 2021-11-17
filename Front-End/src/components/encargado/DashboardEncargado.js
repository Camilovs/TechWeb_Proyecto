import React, { useState } from "react";
import { useHistory } from "react-router";
import { GestionEstudiantes, GestionUsuarios } from "./GestionEstudiantes";
import { GestionSalas, Plantillas } from "./GestionSalas";

export const DashboardEncargado = () => {
  const [vistaActual, setvistaActual] = useState("GestionEstudiantes");

  let history = useHistory();
  return (
    <div  >
      <div >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              MeAnoto
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    onClick={() => setvistaActual("GestionEstudiantes")}
                  >
                    Gestión estudiantes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => setvistaActual("GestionSalas")}
                  >
                    Gestión salas
                  </a>
                </li>
              </ul>
              <div class="dropdown">
              <button class="dropdown-item"  onClick={() => history.push("/")}>
                      Cerrar sesión
                    </button>


              </div>
            </div>
          </div>
        </nav>
        <br/>
        
        {vistaActual === "GestionSalas" ? <GestionSalas/> : <GestionEstudiantes />}
      </div >

      
    </div>
  );
};
/*
 <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              MeAnoto
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Plantillas
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Gestión de usuarios
                  </a>
                </li>
              </ul>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  usuario
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" onClick={() => history.push("/")}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <br />
      <div class="containter " style={{ marginLeft: "10px" }}>
        <div class="row">
          <div class="col align-self-center">
            <button
              type="button"
              class="btn btn-light m"
              style={{ margin: "4px" }}
            >
              Seleccionar plantilla
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "4px" }}
            >
              + Crear plantilla
            </button>
          </div>
        </div>
      </div>
      <br />
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div class="card" style={{ width: "20rem", height: "25rem" }}>
              <div class="card-body">
                <h5 class="card-title">Propiedades plantilla</h5>
                <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                <h7>nombre:</h7>
                <br />
                <h7>Tipo:</h7>
                <br />
                <h7>Veces modificada:</h7>
                <br />
                <h7>Creada por: </h7>
                <br />
                <h7>Última edición:</h7>
                <br />
                <h7>Motivo edición:</h7>
                <br />
                <br />
                <h6>Utilizado Actualmente: 25 veces</h6>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div
              class="card"
              style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
            >
              <div class="card-body">
                <h5 class="card-title">Edición plantilla</h5>
                <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                <h7>nombre:</h7>
                <br />
                <h7>Tipo:</h7>
                <br />
                <h7>Veces modificada:</h7>
                <br />
                <h7>Creada por: </h7>
                <br />
                <h7>Última edición:</h7>
                <br />
                <h7>Motivo edición:</h7>
                <br />
                <br />
                <h6>Utilizado Actualmente: 25 veces</h6>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div
              class="card"
              style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
            >
              <div class="card-body">
                <h5 class="card-title">Comentarios edicion</h5>
                <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                <h7>nombre:</h7>
                <br />
                <h7>Tipo:</h7>
                <br />
                <h7>Veces modificada:</h7>
                <br />
                <h7>Creada por: </h7>
                <br />
                <h7>Última edición:</h7>
                <br />
                <h7>Motivo edición:</h7>
                <br />
                <br />
                <h6>Utilizado Actualmente: 25 veces</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

*/
