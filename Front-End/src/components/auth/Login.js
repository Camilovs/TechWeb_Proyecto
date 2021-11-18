import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fetchSinToken } from '../../helpers/fetch';
import Container from "@material-ui/core/Container";
import AlertMassage from "./AlertMessage";

const LogoMeAnoto = styled.div`
  text-align: center;
  padding: 35px;
`;

export const Login = ({changeVista}) => {
  let history = useHistory();
  const [status, setStatusBase] = React.useState("");
  const initialValue = {
    email:'',
    password:'',
    checkRemember:0
  };
  const [formValues, setFormValues] = useState(initialValue)  
  const {email, password} = formValues;

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }
  
  const handleSubmitForm = async(e) =>{
    e.preventDefault();

    if (email!=='' & password!=='') {

      console.log("Cargando información a Backend");
      console.log(email, password)
      const resp = await fetchSinToken('auth', {"email":email, "pass":password}, 'POST')
      const usuario = await resp.json();
      
      if (usuario.ok === false){
        console.log("ERROR")
        setFormValues(initialValue)
        setStatusBase({ msg: "Usuario o Contraseña ingresados son incorrectos", key: Math.random() });
      }
      else {
        console.log(usuario)
        localStorage.setItem('userToken', usuario.token)
        RedirectTo(usuario.rol)
      }
    }
    else {
      setStatusBase({ msg: "Ingrese un Correo y Contraseña", key: Math.random() });
    }
  };

  const RedirectTo = (usuario) => {

    if(usuario==='Admin'){
      history.push('/administrador')
    }
    else if(usuario==='Encargado'){
      history.push('/encargado')
    }
    else if(usuario==='Profesor'){
      history.push('/profesor')
    }
    else if(usuario==='Estudiante'){
      history.push('/estudiante')
    }
  }
  
  return (
    <Fragment>
      <LogoMeAnoto>
        <img
          src="https://i.imgur.com/RnnsK1K.jpg"
          alt="login"
          width="200"
        />
      </LogoMeAnoto>
      <h2 className="text-center"> Bienvenido/a </h2>
      <div className="container">
        <form onSubmit={handleSubmitForm} >
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            id="loginEmail"
            value={email}
            onChange={handleInputChange}
            />
          <label htmlFor="email" className="form-label">
            Contraseña
          </label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            id="loginPassword"
            value={password}
            onChange={handleInputChange}  
          />
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="remember"></input>
            <label className="form-check-label" htmlFor="remember">Recuérdame</label>
          </div>
          <div className="d-grid col-6 mx-auto">
            <button className="btn btn-custom-primary" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="text-center">Recuperar contraseña</p>
        <div className="text-center">
          <button
            className="btn btn-link"
            onClick={()=>changeVista('registro')}
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
      {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
    </Fragment>
  )
}
