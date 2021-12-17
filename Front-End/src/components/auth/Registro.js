import React, { Fragment, useState } from 'react'
import styled from 'styled-components';
import { passwordStrength } from 'check-password-strength'
import { fetchSinToken } from '../../helpers/fetch';
import { useHistory } from 'react-router';
import AlertMassage from '../shared/AlertMessage';

var emailTrue = require("email-validator");

const Logo = styled.div`
  text-align: center;
  padding: 35px;
`;
export const Registro = ({changeVista}) => {
  let history = useHistory();
  const [status, setStatusBase] = React.useState("");
  const [ok, setOk] = useState(false)
  const [errorForm, setErrorForm] = useState(false)
  const initialValue={
    email:'',
    password:'',
    name:'',
    password2:''
  }
  const [formValues, setFormValues] = useState(initialValue)  
  const {email, password, name, password2} = formValues;

  const handleInputChange = ({target}) => {
    // console.log(target.value)
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }
  
  const handleSubmitForm = async(e) =>{
    e.preventDefault(); 
    // console.log(formValues);

    if (name=='') {
      // console.log('Nombre no ingresado')
      
      setStatusBase({ msg: "Ingrese un nombre", key: Math.random() });
      setErrorForm(true)
    } else {
      if (email==''){
        // console.log('Correo no ingresado')
        setStatusBase({ msg: "Ingrese un Correo", key: Math.random() });
        setErrorForm(true)

      } else {
        if (!(emailTrue.validate(email))) {
          // console.log('Correo no válido')
          setStatusBase({ msg: "Ingrese un Correo válido", key: Math.random() });
          setErrorForm(true)

        } else {
        if (password=='') {
          // console.log('No se ha ingresado contraseña')
          setStatusBase({ msg: "Ingrese una contraseña", key: Math.random() });
          setErrorForm(true)

        } else {
          if (passwordStrength(password).id < 1) {
            // console.log('Contraseña no cumple seguridad')
            setStatusBase({ msg: "La contraseña debe tener al menos 6 caracteres entre letras y números", key: Math.random() });
            setErrorForm(true)
          } else {
            if (password!==password2) {
              // console.log('Contraseñas no coinciden')
              setStatusBase({ msg: "Las contraseñas deben coincidir", key: Math.random() });
              setErrorForm(true)
            } else {
              const resp = await fetchSinToken(
                'auth/new', 
                {
                  "nombre":name, 
                  "email":email, 
                  "pass":password,
                  "pass2":password2
                }, 
                'POST');
              const body = await resp.json();
              if (body.ok === false){
                console.log("ERROR: ", body.msg)
                setFormValues(initialValue)
              }
              else {
                console.log('Cuenta creada')
                setErrorForm(false)
                setStatusBase({msg:"Cuenta creada. No podrás iniciar sesión hasta verificar tu identidad. Revisa tu correo institucional para mas información.", key: Math.random()})
                setOk(true)
                setFormValues(initialValue)
              }
            }
          }
        }
      }
    }
  }
};
  
  return (
    <Fragment>
      <Logo>
        <img
          src="https://i.imgur.com/RnnsK1K.jpg"
          alt="login"
          width="200"
        />
      </Logo>
      <h2 className="text-center"> Crea tu cuenta de estudiante </h2>
      <div className="container">
        {ok && (
          <AlertMassage key={status.key} message={status.msg} severity="success" />
        )}
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
              <button className="btn btn-custom-primary" type="submit">
                Crear Cuenta
              </button>
            </div>
        </form>
        
        <div className="text-center">
          <button
            className="btn btn-link"
            onClick={()=>changeVista('login')}
          >
            Ya tengo una cuenta
          </button>
        </div>
        {errorForm ? <AlertMassage key={status.key} message={status.msg} severity="warning"/> : null}
      </div>
    </Fragment>
  )
}
