// URL Local = 'http://localhost:4040/api';
// URL Heroku = 'https://me-anoto.herokuapp.com/api';
// URL Elias = 'http://mrrojano97.ddns.net:40404/api';

const base_url = `${process.env.REACT_APP_BASE_URL_LOCAL}`
//Fetch que no necesita un token para consultar las apis, como ej: Autenticacion
const fetchSinToken = async(endpoint, data, method = 'GET') => {

  const url = `${base_url}/${endpoint}`;
  if(method==='GET'){
    return await fetch(url);
  }
  else{
    return await fetch(url,{
      method,
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

//Fetch que si necesita un token para consultar las apis. El token se envia en los headers que es analizado en el Back.
//Ej: Todas las acciones del CRUD de cualquier usuario requieren un token activo y valido.
const fetchConToken = async(endpoint, data, method = 'GET') => {
  
  const url = `${base_url}/${endpoint}`;
  console.log('fetch: ',url)
  console.log('data: ',data)
  const token = localStorage.getItem('userToken') || '';


  if(method==='GET'){
    return fetch(url,{
      headers:{
        'x-token':token
      }
    });
  }
  else{
    return await fetch(url,{
      method,
      headers:{
        'Content-type': 'application/json',
        'x-token':token
      },
      body: JSON.stringify(data)
    })
  }
}

export {
  fetchSinToken,
  fetchConToken
}

