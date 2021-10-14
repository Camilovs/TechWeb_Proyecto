import React, { Component } from "react";

export default class LoginScreen extends Component {
  render() {
    return (
      <form>
        <div class="text-center">
          <h3>Iniciar sesión</h3>
        </div>
        <div class="mb-4">
          <label for="email" class="form-label">
            Correo electrónico
          </label>
          <input type="email" class="form-control" name="email" />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">
            Contraseña
          </label>
          <input type="password" class="form-control" name="email" />
        </div>
        <div class="mb-4 form-check">
          <input type="checkbox" name="connected" class="form-check-input" />
          <label for="connected" class="form-check-label">
            Mantener sesión
          </label>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">
            Iniciar sesión
          </button>
        </div>
        <div class="my-3">
          <span>
            No tienes cuenta? <a href="#">Registrarse</a>
          </span>
          <br />
          <span>
            {" "}
            <a href="#">Recuperar contraseña</a>
          </span>
        </div>
      </form>
    );
  }
}
