import React, { useState } from "react";
import { Route, Router, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchLogin } from "../../helpers/fetch";
import { passwordStrength } from 'check-password-strength'
import { Alert } from 'bootstrap'

var emailTrue = require("email-validator");

const loginUsuario = async() => {
  var email = document.getElementById('loginEmail')
  var pass = document.getElementById('loginPassword')
  

  if (email.value!='' & pass.value!='') {

    console.log("Cargando información a Backend");
    const resp = await fetchLogin('auth', {"email":email.value, "pass":pass.value}, 'POST')
    const body = await resp.json();

    console.log(body.ok)
    if (body.ok == false){
      email.setCustomValidity('Correo o Contraseña Ingresados son Incorrectos')
    }
    else {
      console.log(body.token)
      email.setCustomValidity('')
      localStorage.setItem('userToken', body.token)
      
    }
  }
}

const verifInfoRegistro = async() => {
  console.log("Verificando información ingresada")

  var pass1 = document.getElementById('registerPassword1')
  var pass2 = document.getElementById('registerPassword2')
  var email = document.getElementById('registerEmail')

  if (emailTrue.validate(email.value)) {
      console.log("Correo valido")
      email.setCustomValidity('')

    if (passwordStrength(pass1.value).id >= 1) {
      console.log("Contraseña Cumple")
      pass1.setCustomValidity('')

      if (pass1.value==pass2.value) {
        console.log("Las contraseñas son iguales")
        pass2.setCustomValidity('')
      }

      else {
        console.log("ERROR: Contraseñas distintas")
        pass2.setCustomValidity("Las contraseñas deben ser iguales");
      }
    }
    else {
        console.log("ERROR: Contraseña no cumple seguridad")
        pass1.setCustomValidity("La contraseña debe tener al menos 6 caracteres entre letras y números")
    }
  }

  else {
    console.log("ERROR: Correo no válido")
    email.setCustomValidity('Ingrese un correo válido')
  }
}

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
                <form id="formulario_registro">
                  <div className="text-center">
                    <h3>Registrarse</h3>
                  </div>
                  <div className="mb-4">
                    <label for="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input id="registerEmail" type="email" className="form-control" name="email" required />
                  </div>
                  <div className="mb-4">
                    <label for="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="registerPassword1"
                      type="password"
                      className="form-control"
                      name="password_register1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label for="password" className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      id="registerPassword2"
                      type="password"
                      className="form-control"
                      name="password_register2"
                      required
                    />
                  </div>
                  <a onClick={() => verifInfoRegistro()}>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                          Registrarse
                    </button>
                  </div> </a>
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
                    <input id="loginEmail" type="email" className="form-control" name="email" required  />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="loginPassword"
                      type="password"
                      className="form-control"
                      name="email"
                      required
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
                  <a onClick={() => loginUsuario()}>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  </div> </a>
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
