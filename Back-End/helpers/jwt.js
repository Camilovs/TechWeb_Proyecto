const jwt = require('jsonwebtoken');

const generarJWT = (uid,nombre,rol) => {
  
  return new Promise((resolve,reject)=>{
    
    const payload = {uid, nombre, rol};

    jwt.sign(payload, process.env.SECRET_WORD, {
      // expiresIn:'1h'
      expiresIn:'365d'
    }, (err, token)=>{
      if(err){
        console.log(err)
        reject("No se pudo generar el token");
      }

      resolve(token)
    })

  })

}

module.exports = {
  generarJWT
}
