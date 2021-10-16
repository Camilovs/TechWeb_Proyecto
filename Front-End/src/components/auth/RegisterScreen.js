import React, { Component } from "react";

export default class LoginScreen extends Component {
  render() {
    return (
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
          <input type="password" className="form-control" name="password" />
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
            <a href="#">Volver</a>
          </span>
        </div>
      </form>
    );
  }
}
