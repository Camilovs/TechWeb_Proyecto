import {Switch, Route, BrowserRouter } from "react-router-dom";
import { DashboardAdmin } from "./components/administrador/DashboardAdmin";
import { DashboardEstudiante } from "./components/estudiante/DashboardEstudiante";
import { Auth } from "./components/auth/Auth";
import { HomeEnc } from "./components/encargado/HomeEnc";
import { HomeProfe } from "./components/profesor/HomeProfe";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <ConfirmProvider>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/old" component={Auth_OLD} /> */}
          <Route exact path="/" component={Auth} />
          <Route exact path="/administrador" component={DashboardAdmin} />
          <Route exact path="/estudiante" component={DashboardEstudiante} />
          <Route exact path="/encargado" component={HomeEnc} />
          <Route exact path="/profesor" component={HomeProfe} />
        </Switch>
      </BrowserRouter>
    </ConfirmProvider>
    
  );
}

export default App;
