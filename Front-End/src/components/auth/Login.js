import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import AlertMassage from '../shared/AlertMessage';


const LogoMeAnoto = styled.div`
  text-align: center;
  padding: 35px;
`;

export const Login = ({changeVista}) => {
  let history = useHistory();
  const [status, setStatusBase] = React.useState("");
  const [msgError, setMsgError] = useState('')
  const [error, setError] = useState(false)
  const [warning, setWarning] = useState(false)
  const initialValue = {
    email:'',
    password:'',
    checkRemember:0
  };
  const [formValues, setFormValues] = useState(initialValue)
  const {email, password} = formValues;

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

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }
  const setSemestreActual = async() => {
    const query = await fetchConToken(
      'semestres/actual',
      {},
      'GET'
    )
    const resp = await query.json()
    const semestre = `${resp.semestre[0].anio}/${resp.semestre[0].numero}`
    localStorage.setItem('semestre',semestre)
  }
  const handleSubmitForm = async(e) =>{
    e.preventDefault();

    if (email!=='' & password!=='') {

      const resp = await fetchSinToken('auth', {"email":email, "pass":password}, 'POST')
      const usuario = await resp.json();

      if (usuario.ok === false){
        if(usuario.errors){
          setMsgError('ERROR: Alguno de los campos tiene un formato incorrecto, porfavor revisa correo y contraseña.')
        }
        else{
          setMsgError(usuario.msg)
        }
        setError(true)
      }
      else {
        localStorage.setItem('userToken', usuario.token)
        localStorage.setItem('uid', usuario.uid)
        setSemestreActual()
        RedirectTo(usuario.rol)
      }
    }
    else {
      setStatusBase({ msg: "Ingrese un Correo y Contraseña", key: Math.random() });
      setWarning(true)
    }
  };



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
        <p className="text-center mt-3">Recuperar contraseña</p>
        <div className="text-center">
          <button
            className="btn btn-link"
            onClick={()=>changeVista('registro')}
          >
            ¿Eres Estudiante? Regístrate aquí
          </button>
        </div>
      </div>
      {error && (
        <AlertMassage
          message={msgError}
          setState={setError}
          severity='error'
        />
      )}
      {warning && (
        <AlertMassage
          message={status.msg}
          setState={setWarning}
        />
      )}
    </Fragment>
  )
}
