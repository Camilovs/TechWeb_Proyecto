import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { passwordStrength } from 'check-password-strength'
import { fetchSinToken } from '../../helpers/fetch';
import { useHistory } from 'react-router';

const Logo = styled.div`
  text-align: center;
  padding: 5vh;
`;
export const Registro = ({changeVista}) => {
  let history = useHistory();
  const initialValue={
    email:'',
    password:'',
    name:'',
    password2:''
  }
  const [formValues, setFormValues] = useState(initialValue)  
  const {email, password, name, password2} = formValues;

  const handleInputChange = ({target}) => {
    console.log(target.value)
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }
  
  const handleSubmitForm = async(e) =>{
    e.preventDefault(); 
    console.log(formValues);
    if (email!=='' & password!=='' & name!=='') {
      
      console.log("Cargando información a Backend");
      console.log(email, password, name);
      const resp = await fetchSinToken(
        'auth/new', 
        {
          "nombre":name, 
          "email":email, 
          "pass":password
        }, 
        'POST');
      const body = await resp.json();
      
      if (body.ok === false){
        console.log("ERROR")
        // emailInput.setCustomValidity('Correo o Contraseña Ingresados son Incorrectos')
        setFormValues(initialValue)
      }
      else {
        console.log(body.token)
        localStorage.setItem('userToken', body.token)
        history.push('/estudiante')
      }
    }
  };

  const validarInputs = (e) => {
    
    console.log("Verificando información ingresada")
    e.preventDefault();
  
    const pass1 = document.getElementById('password')
    const pass2 = document.getElementById('password2')
    console.log(pass1, pass2)
    if (passwordStrength(pass1.value).id >= 1) {
      console.log("Contraseña Cumple")
      pass1.setCustomValidity('')

      if (pass1.value===pass2.value) {
        console.log("Las contraseñas son iguales")
        pass2.setCustomValidity('')
        console.log(formValues);
      
      }

      else {
        console.log("ERROR: Contraseñas distintas")
        pass2.setCustomValidity("Las contraseñas deben ser iguales");
        
      }
    }
    else {
        console.log("ERROR: Contraseña no cumple seguridad")
        pass1.setCustomValidity("La contraseña debe tener al menos 6 caracteres entre letras y números")
        
    }
  } 
  
  return (
    <Fragment>
      <Logo>
        <img
          src="https://i.imgur.com/RnnsK1K.jpg"
          alt="login"
          width="130"
        />
      </Logo>
      <h2 className="text-center"> Bienvenido/a </h2>
      <div className="container">
        <form onSubmit={handleSubmitForm} >
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input 
            type="name" 
            className="form-control" 
            name="name" 
            id="name"
            value={name}
            onChange={handleInputChange}
            />
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
          <label htmlFor="password" className="form-label">
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
          <label htmlFor="password2" className="form-label">
            Confirmar contraseña
          </label>
          <input 
            type="password" 
            className="form-control" 
            name="password2" 
            id="password2"
            value={password2}
            onChange={handleInputChange}  
          />
          <div className="d-grid col-6 mx-auto mt-3 mb-3">
            <button className="btn btn-primary" type="submit">
              Crear Cuenta
            </button>
          </div>
          <div className="text-center">
          <button
            className="btn btn-link"
            onClick={()=>changeVista('login')}
          >
            Ya tengo una cuenta
          </button>
        </div>
        </form>

      </div>
    </Fragment>
  )
}
