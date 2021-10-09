const jwt = require('jsonwebtoken');

const generarJWT = (uid,nombre) => {
  
  return new Promise((resolve,reject)=>{
    
    const payload = {uid, nombre};

    jwt.sign(payload, process.env.SECRET_WORD, {
      expiresIn:'1h'
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
