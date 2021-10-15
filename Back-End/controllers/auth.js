const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

  const {email,pass} = req.body;

  try {

    //Consultar si existe un usuario en la base de datos
    let usuario = await Usuario.findOne({email})
    if(usuario){
      return res.status(400).json({
        ok:false,
        msg:"Ya existe un usario con ese correo"
      })
    }


    usuario = new Usuario(req.body); 

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.pass = bcrypt.hashSync(pass, salt);

    await usuario.save()

    const token = await generarJWT(usuario.id, usuario.nombre);

    res.status(201).json({
      ok:true,
      msg:'registro',
      uid:usuario.id,
      nombre:usuario.nombre,
      token
    })
    
  } catch (error) {
    console.log(error)
    res.json({
      ok:false,
      msg:error
    })
  }

}
const loginUsuario = async(req, res = response) => {

  const {email,pass} = req.body;
  console.log("recibido", req.body)
  try {
    let usuario = await Usuario.findOne({email});
    console.log("usuario:",usuario)
    if(!usuario){
      return(
        res.status(400).json({
          ok:false,
          msg:"Error en credenciales"
        })
      )
    }
    const passValido = bcrypt.compareSync(pass, usuario.pass);
    if(!passValido){
      return(
        res.status(400).json({
          ok:false,
          msg:"Error de password"
        })
      )
    }

    const token = await generarJWT(usuario.id, usuario.nombre);

    res.status(200).json({
      ok:true,
      msg:'Inicio de sesion correcto',
      uid:usuario.id, 
      nombre:usuario.nombre,
      token

    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:error
    })
  }
  
}
const revalidarToken = async (req, res = response) => {

  //Extraer contenido del req
  const {uid, name} = req;

  //Generar JSON WEB TOKEN
  const token = await generarJWT(uid, name);

  res.json({
    ok:true,
    msg:"Token valido",
    uid,
    name,
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}