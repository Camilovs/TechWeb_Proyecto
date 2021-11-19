import {Switch, BrowserRouter, Redirect, Route } from "react-router-dom";
import { DashboardAdmin } from "./components/administrador/DashboardAdmin";
import { DashboardEstudiante } from "./components/estudiante/DashboardEstudiante";
import { Auth } from "./components/auth/Auth";
import { HomeEnc } from "./components/encargado/HomeEnc";
import { HomeProfe } from "./components/profesor/HomeProfe";
import { ConfirmProvider } from "material-ui-confirm";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { fetchConToken } from "./helpers/fetch";
import { PublicRoute } from "./router/PublicRoute";
import { PrivateRoute } from "./router/PrivateRoute";
import { Verificar } from "./components/estudiante/Verificar";
const Base = styled.div`
  background-color: #E4E4E4;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App =() => {
  const [uid, setUid] = useState(localStorage.getItem('uid'))
  const [path, setPath] = useState('/')
  const [wait, setWait] = useState(false)
  const revisarToken = async() => {
    const query = await fetchConToken('auth/renew',{})
    const resp = await query.json()
    console.log(resp)
    if(resp.ok){
      if(resp.rol==='Admin'){
        setPath('/administrador')
      }
      else if(resp.rol==='Encargado'){
        setPath('/encargado')
      }
      else if(resp.rol==='Profesor'){ 
        setPath('/profesor')
      }
      else if(resp.rol==='Estudiante'){
        setPath('/estudiante')
      }
      setUid(resp.uid)
      setWait(false)
    }
    else{
      console.log('no hay token')
      setPath('/')
      setWait(false)
    }
  }
  
  useEffect(() => {
    // revisarToken();
  }, [])
  if(!wait){
    return (
      <Base>
        <ConfirmProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/administrador" component={DashboardAdmin} />
              <Route exact path="/estudiante" component={DashboardEstudiante} />
              <Route exact path="/encargado" component={HomeEnc} />
              <Route exact path="/profesor" component={HomeProfe} />
              <Route exact path="/verificar/:id" component={Verificar} />
              {/* <PublicRoute 
                exact 
                path='/'
                redirect_to = {path}
                component={Auth} 
                isAuthenticated = {!!uid}
              />
              <PrivateRoute 
                exact
                path='/administrador'
                component={DashboardAdmin} 
                isAuthenticated = {!!uid}
  
              />
              <PrivateRoute 
                exact
                path='/estudiante'
                component={DashboardEstudiante}
                isAuthenticated = {!!uid}
                />
                
              <PrivateRoute 
                exact 
                path='/encargado'
                component={HomeEnc}
                isAuthenticated = {!!uid}
                />
                
              <PrivateRoute 
                exact 
                path='/profesor'
                component={HomeProfe}
                isAuthenticated = {!!uid}
                />
              <Redirect to='/'/> */}
            </Switch>
          </BrowserRouter>
        </ConfirmProvider>
      </Base>  
    );
  }
  else{
    return(
      <h1>Esperando...</h1>
    )
  }
}

export default App;
