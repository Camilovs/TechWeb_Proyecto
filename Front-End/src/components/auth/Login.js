import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fetchLogin } from '../../helpers/fetch';

const LogoMeAnoto = styled.div`
  text-align: center;
  padding: 5vh;
`;

export const Login = ({changeVista}) => {
  let history = useHistory();
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
      
      var emailInput = document.getElementById('email')
  
      console.log("Cargando información a Backend");
      console.log(email, password)
      const resp = await fetchLogin('auth', {"email":email, "pass":password}, 'POST')
      const body = await resp.json();
      
      if (body.ok === false){
        console.log("ERROR")
        // emailInput.setCustomValidity('Correo o Contraseña Ingresados son Incorrectos')
        setFormValues(initialValue)
      }
      else {
        console.log(body.token)
        localStorage.setItem('userToken', body.token)
        history.push('/administrador')
      }
    }
  };

  return (
    <Fragment>
      <LogoMeAnoto>
        <img
          src="https://i.imgur.com/RnnsK1K.jpg"
          alt="login"
          width="130"
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
            id="email"
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
            id="password"
            value={password}
            onChange={handleInputChange}  
          />
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="remember"></input>
            <label className="form-check-label" htmlFor="remember">Recuérdame</label>
          </div>
          <div className="d-grid col-6 mx-auto">
            <button className="btn btn-primary" type="submit">
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
    </Fragment>
  )
}
