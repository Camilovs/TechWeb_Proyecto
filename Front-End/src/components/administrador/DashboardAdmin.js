import React from "react";
import { useHistory } from "react-router";
import { NavBar } from "../shared/NavBar";

export const DashboardAdmin = () => {
  let history = useHistory();
  return (
    <div>
      <NavBar/>
      <br />
      <div className="containter " style={{ marginLeft: "10px" }}>
        <div className="row">
          <div className="col align-self-center">
            <button
              type="button"
              className="btn btn-light m"
              style={{ margin: "4px" }}
            >
              Seleccionar plantilla
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ margin: "4px" }}
            >
              + Crear plantilla
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="card" style={{ width: "20rem", height: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Propiedades plantilla</h5>
                <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
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
          <div className="col-sm">
            <div
              className="card"
              style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
            >
              <div className="card-body">
                <h5 className="card-title">Edición plantilla</h5>
                <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
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
          <div className="col-sm">
            <div
              className="card"
              style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
            >
              <div className="card-body">
                <h5 className="card-title">Comentarios edicion</h5>
                <h6 className="card-subtitle mb-2 text-muted ">Card subtitle</h6>
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
  );
};
