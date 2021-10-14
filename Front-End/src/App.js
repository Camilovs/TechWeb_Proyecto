import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Iniciar Sesion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="container w-75 bg-primary mt-5 rounded shadow">
          <div class="row align-items-stretch">
            <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
            <div class="col bg-white p-5 rounded-end">
              <div class="text-end">
                <img src="" width="48" />
              </div>
              <h2 class="fw-bold text-center pt-5 mb-5">Bienvenido</h2>
              <Switch class="col-6">
                <Route exact path="/" component={LoginScreen} />
                <Route path="/sign-in" component={LoginScreen} />
                <Route path="/sign-up" component={RegisterScreen} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
