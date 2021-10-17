import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-center">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Iniciar Sesión
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

        <div className="container w-75 bg-primary mt-5 rounded shadow fixed-center">
          <div className="row align-items-stretch">
            <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
            <div className="col bg-white p-5 rounded-end">
              <div className="text-end">
              </div>
              <h2 className="fw-bold text-center pt-1 mb-3">
                <img src="https://i.imgur.com/RnnsK1K.jpg" alt="login" width="150" />
              </h2>
              <Switch className="col-6">
                <Route exact path="/" component={LoginScreen} />
                <Route path="/sign-in" component={LoginScreen} />
                <Route path="/sign-up" component={RegisterScreen} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 fixed-bottom">
        <div className="container text-center">
          <small>Copyright Tecnologías Web &copy; Me Anoto</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;
