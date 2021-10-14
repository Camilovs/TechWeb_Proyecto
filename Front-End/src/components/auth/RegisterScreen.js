import React, { Component } from "react";

export default class LoginScreen extends Component {
  render() {
    return (
      <form>
        <div class="text-center">
          <h3>Registrarse</h3>
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
          <input type="password" class="form-control" name="password" />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            class="form-control"
            name="confirmar-password"
          />
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">
            Registrarse
          </button>
        </div>
        <div class="my-3 ">
          <span>
            {" "}
            <a href="#">Volver</a>
          </span>
        </div>
      </form>
    );
  }
}
