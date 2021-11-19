const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{

  //extraer el header llamado x-token que trae el info del token
  const token = req.header('x-token');
  
  //si el token no existe, retornamos un error
  if(!token){
    return res.status(401).json({
      ok:false,
      msg:"No hay token"
    });
  }

  //Si el token existe, validamos si es autentico
  try {
    
    //Extraemos el uid y el name del token si es valido
    const {uid, nombre, rol} = jwt.verify(
      token,
      process.env.SECRET_WORD
    );
    
    //agregamos el campo de uid y name al request.
    req.uid = uid;
    req.nombre = nombre;
    req.rol = rol

  } catch (error) {
    return res.status(401).json({
      ok:false,
      msg:"Token no valido"
    })
  }
  //Seguimos con la siguiente instruccion luego de validar
  next();


};

module.exports = {
  validarJWT
}
