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
import { Verificar } from "./components/estudiante/Verificar";
import { useHistory } from "react-router-dom";

const Base = styled.div`
  background-color: #E4E4E4;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App =() => {
  let history = useHistory()
  const [redirect, setRedirect] = useState('/')
  const revisarToken = async() => {
    const query = await fetchConToken('auth/renew',{})
    const resp = await query.json()
    if(resp.ok){
      if(resp.rol==='Admin'){
        console.log("admin")
        // setRedirect()
        // history.push('/administrador')
        return(<Redirect to='/administrador'/>)
      }
      else if(resp.rol==='Encargado'){
      }
      else if(resp.rol==='Profesor'){ 
      }
      else if(resp.rol==='Estudiante'){
      }
    }
    else{
      console.log('no hay token')
    }
  }
  
  const setSemestreActual = async() => {
    console.log('get semestres')
    const query = await fetchConToken(
      'semestres/actual',
      {},
      'GET'
    )
    const resp = await query.json()
    console.log('semestre: ',resp.semestre[0])
    const semestre = `${resp.semestre[0].anio}/${resp.semestre[0].numero}`
    localStorage.setItem('semestre',semestre)
    console.log(semestre)
  }
  

  useEffect(() => {
    if(localStorage.getItem('userToken') && !localStorage.getItem('semestre')){
      setSemestreActual()
    }
    // revisarToken();
  }, [])
 
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
            <Redirect to='/'/>
          </Switch>
        </BrowserRouter>
      </ConfirmProvider>
    </Base>  
  );
}

export default App;
