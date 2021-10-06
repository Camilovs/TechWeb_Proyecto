const {response} = require('express');
const {validationResult} = require('express-validator');

const crearUsuario = (req, res = response) => {

  const {nombre,email,password} = req.body;

  res.json({
    ok:true,
    msg:'registro',
    nombre,
    email,
    password
  })
}
const loginUsuario = (req, res = response) => {

  const {email,password} = req.body;

  res.json({
    ok:true,
    msg:'login',
    email,
    password
  })
}
const revalidarToken = (req, res = response) => {
  res.json({
    ok:true,
    msg:'renew'
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}