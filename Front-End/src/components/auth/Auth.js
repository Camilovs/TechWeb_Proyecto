import React, { useState } from "react";
import { Route, Router, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";

export const Auth = () => {
  const [vistaAuth, setvistaAuth] = useState("login");
  let history = useHistory();
  return (
    <div>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-center">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto"></ul>
            </div>
          </div>
        </nav>

        <div className="container w-75 bg-primary mt-5 rounded shadow fixed-center">
          <div className="row align-items-stretch">
            <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
            <div className="col bg-white p-5 rounded-end">
              <div className="text-end"></div>
              <h2 className="fw-bold text-center pt-1 mb-3">
                <img
                  src="https://i.imgur.com/RnnsK1K.jpg"
                  alt="login"
                  width="150"
                />
              </h2>
              {vistaAuth === "registro" ? (
                <form>
                  <div className="text-center">
                    <h3>Registrarse</h3>
                  </div>
                  <div className="mb-4">
                    <label for="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input type="email" className="form-control" name="email" />
                  </div>
                  <div className="mb-4">
                    <label for="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <div className="mb-4">
                    <label for="password" className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmar-password"
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Registrarse
                    </button>
                  </div>
                  <div className="my-3 text-center">
                    <span>
                      {" "}
                      <a onClick={() => setvistaAuth("login")}>Volver</a>
                    </span>
                  </div>
                </form>
              ) : (
                <form onSubmit={() => history.push("/administrador")}>
                  <div className="text-center">
                    <h3>Iniciar Sesión</h3>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input type="email" className="form-control" name="email" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="email"
                    />
                  </div>
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      name="connected"
                      className="form-check-input"
                    />
                    <label htmlFor="connected" className="form-check-label">
                      Mantener sesión
                    </label>
                    <span>
                      {" "}
                      <a href="#">Recuperar contraseña</a>
                    </span>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="my-3">
                      <span>
                        ¿No tienes cuenta?{" "}
                        <a onClick={() => setvistaAuth("registro")}>
                          Registrarse
                        </a>
                      </span>
                      <br />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*
      <footer
        id="sticky-footer"
        className="flex-shrink-0 py-4 bg-dark text-white-50 fixed-bottom"
      >
        <div className="container text-center">
          <small>Copyright Tecnologías Web &copy; Me Anoto</small>
        </div>
      </footer>


*/}
    </div>
  );
};
