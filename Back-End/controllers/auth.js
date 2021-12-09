const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { transport } = require('../helpers/mail');


const crearEstudiante = async (req, res = response) => {
  const {email,pass, pass2} = req.body;

  try {

    //Consultar si existe un usuario en la base de datos
    let usuario = await Usuario.findOne({email})
    if(usuario){
      return res.status(400).json({
        ok:false,
        msg:"Ya existe un usario con ese correo"
      })
    }
    if(pass !== pass2){
      return res.status(400).json({
        ok:false,
        msg:"Contraseñas incorrectas"
      })
    }
    const info ={
      ...req.body,
      verificado:false
    }
    usuario = new Usuario(info); 

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.pass = bcrypt.hashSync(pass, salt);

    usuario.rol = 'Estudiante'

    await usuario.save()

    let resp = transport.sendMail({
      from:'techweb.meanoto@gmail.com',
      to: email,
      subject: "Hola, confirma tu correo ✔", 
      text: "Hello world?", 
      html: `
          <p>Hola! Gracias por crear tu cuenta</p>
          <p>Para verificar tu identidad haz click en el siguiente enlace</p>
          <p> <a href="http://localhost:3000/verificar/${usuario.id}"> http://localhost:3000/verificar/${usuario.id} </a></p>   
      `, 
    })
    const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);
    
    res.status(200).json({
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
  try {
    let usuario = await Usuario.findOne({email});
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
    if(!usuario.verificado){
      return(
        res.status(400).json({
          ok:false,
          msg:"El usuario no se encuentra verificado. Revisa tu correo electrónico para  mas información"
        })
      )
    }
    const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);

    res.status(200).json({
      ok:true,
      msg:'Inicio de sesion correcto',
      uid:usuario.id, 
      nombre:usuario.nombre,
      rol:usuario.rol,
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
  const {uid, nombre,rol} = req;
  //Generar JSON WEB TOKEN
  const token = await generarJWT(uid, nombre,rol);

  res.json({
    ok:true,
    msg:"Token valido",
    uid,
    nombre,
    rol,
    token
  })
}
const verificarEstudiante = async(req, res = response) => {
  
  // const {uid} = req.body;
  const uid = req.params.id;
  try{
    const update = {verificado:true}
    const usuarioUpdate = 
      await Usuario.findByIdAndUpdate(uid, update, {new:true} )
    res.status(200).json({
      ok:true,
      msg:"Usuario verificado",
      usuarioUpdate
    })
  }
  catch(error){
    console.log(error)
    res.json({
      ok:false,
      msg:error
    })
  }

}

module.exports = {
  crearEstudiante,
  loginUsuario,
  revalidarToken,
  verificarEstudiante
}