const {response} = require('express');
const {validationResult} = require('express-validator');


const validarCampos = (req, res = response, next) =>{

  //manejo de errores
  const errores = validationResult( req );
  if(!errores.isEmpty()){
    return res.status(400).json({
      ok:false,
      errors: errores.mapped()
    })
  }
  
  // next es una funcion que ejecuta la siguiente instrucción o middleware.
  next();

}

module.exports = {
  validarCampos
}