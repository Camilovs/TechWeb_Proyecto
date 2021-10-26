import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import { Auth } from "./components/auth/Auth";
import { DashboardAdmin } from "./components/administrador/DashboardAdmin";
import { DashboardEstudiante } from "./components/estudiante/DashboardEstudiante";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch className="col-6">
          <Route exact path="/" component={Auth} />
          <Route exact path="/administrador" component={DashboardAdmin} />
          <Route exact path="/estudiante" component={DashboardEstudiante} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
