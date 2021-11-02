import "./App.css";
import {Switch, Route, BrowserRouter } from "react-router-dom";
import { DashboardAdmin } from "./components/administrador/DashboardAdmin";
import { DashboardEstudiante } from "./components/estudiante/DashboardEstudiante";
import { Auth } from "./components/auth/Auth";
import styled from "styled-components";

const Fondo = styled.div`
  background-color: #5d6875;
  height: 100vh;
`;

function App() {
  return (
    <Fondo>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/old" component={Auth_OLD} /> */}
          <Route exact path="/" component={Auth} />
          <Route exact path="/administrador" component={DashboardAdmin} />
          <Route exact path="/estudiante" component={DashboardEstudiante} />
        </Switch>
      </BrowserRouter>
    </Fondo>
  );
}

export default App;
