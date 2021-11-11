// URL Local = 'http://localhost:4040/api';
// URL Heroku = 'https://me-anoto.herokuapp.com/api';
// URL Elias = 'http://mrrojano97.ddns.net:40404/api';


//Fetch que no necesita un token para consultar las apis, como ej: Autenticacion
const fetchSinToken = async(endpoint, data, method = 'GET') => {

  console.log("Haciendo fetch hacia ", process.env.REACT_APP_BASE_URL_LOCAL,"/",endpoint)
  const url = `${process.env.REACT_APP_BASE_URL_LOCAL}/${endpoint}`;
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

  console.log("Haciendo fetch hacia ", process.env.REACT_APP_BASE_URL_LOCAL,"/",endpoint)
  const url = `${process.env.REACT_APP_BASE_URL_LOCAL}/${endpoint}`;
  if(method==='GET'){
    return fetch(url,{
      headers:{
        'Content-type': 'application/json',
        'x-token':localStorage.getItem('userToken')
      }
    });
  }
  else{
    return await fetch(url,{
      method,
      headers:{
        'Content-type': 'application/json',
        'x-token':localStorage.getItem('userToken')
      },
      body: JSON.stringify(data)
    })
  }
}

export {
  fetchSinToken,
  fetchConToken
}

