import React, { Component } from "react";

export default class LoginScreen extends Component {
  render() {
    return (
      <form>
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
          <input type="password" className="form-control" name="email" />
        </div>
        <div className="mb-4 form-check">
          <input type="checkbox" name="connected" className="form-check-input" />
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
            ¿No tienes cuenta? <a href="#">Registrarse</a>
          </span>
          <br />
        </div>
        </div>
      </form>
    );
  }
}
