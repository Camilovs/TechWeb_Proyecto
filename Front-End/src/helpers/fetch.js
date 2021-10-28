const base_url_local = 'http://localhost:4040/api';
const base_url = 'https://me-anoto.herokuapp.com/api';
//const base_url = 'http://mrrojano97.ddns.net:40404/api';

const fetchSinToken = async(endpoint, data, method = 'GET') => {

  // const url = `${base_url}/${endpoint}`;
  const url = `${process.env.REACT_APP_BASE_URL}/${endpoint}`;

  if(method==='GET'){
    return fetch(url);
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

export {fetchSinToken}

//AXIOS Y FETCH

// import axios from 'axios';

// const dataExample = {
  
//   email:"admin@correo.com",
//   pass:"123456"

// };
// const postUsuarioAxios = async (data = dataExample) => {
  
//   await axios.post('http://localhost:4040/api/auth', data)
//     .then( res =>{
//       console.log(res.data);
//     }).catch(err =>{
//       console.log(err)
//     })
// }

// const postUsuarioFetch = async (data = dataExample) => {

//   await fetch('http://localhost:4040/api/auth', {
//     method:'post',
//     headers:{
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then( response =>{
//     return response.json()
//   }).then(data =>{
//     console.log(data)
//   });

//   // console.log(resp.json())

// }

// export {postUsuarioAxios, postUsuarioFetch};