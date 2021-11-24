const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');


const crearUsuario  = async (req, res = response) => {
  
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
    const info ={
      ...req.body,
      verificado:true
    }
    usuario = new Usuario(info); 

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.pass = bcrypt.hashSync(pass, salt);

    await usuario.save()

    res.status(201).json({
      ok:true,
      msg:'creacion de usuario',
      uid:usuario.id,
      nombre:usuario.nombre
    })
    
  } catch (error) {
    console.log(error)
    res.json({
      ok:false,
      msg:error
    })
  }
}

const actualizarUsuario = async(req, res = response) => {

  const usuarioId = req.params.id;

  try {

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        ok:false,
        msg:"el usuario no existe"
      })
    }
    
    if(req.body.pass){
      const {pass} = req.body;
      const salt = bcrypt.genSaltSync();
      const newpass = bcrypt.hashSync(pass, salt);
      req.body.pass = newpass;
    }
    
    const usuarioUpdate = await Usuario.findByIdAndUpdate(usuarioId, req.body, {new:true});

    res.json({
      ok:true,
      msg:"Usuario actualizada",
      usuario:usuarioUpdate
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar usuario'
    });
  }
  
}

const eliminarUsuario = async(req, res = response) => {

  const usuarioId = req.params.id;

  try {

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        ok:false,
        msg:"el usuario no existe"
      })
    }

    await Usuario.findByIdAndDelete(usuarioId)

    res.json({
      ok:true,
      msg:"Usuario eliminado"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd eliminar usuario'
    });
  }
  
}

const getUsuarios = async(req, res = response) => {
  
  try {
    
    const usuarios = await Usuario.find();

    if(!usuarios){
      return res.status(404).json({
        ok:false,
        msg:"No existen usuarios"
      })
    }

    res.json({
      ok:true,
      msg:"Usuarios encontradas",
      usuarios
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener usuarios"
    })
  }

}

const getProfesores = async(req ,res = response) =>{

  try{
    const profesores = await Usuario.find({rol:"Profesor"})

    if(!profesores){
      return res.status(404).json({
        ok:false,
        msg:"No existen profesores"
      })
    }
    return(
      res.status(200).json({
        ok:true,
        msg:"Profesores encontrados",
        profesores
      })
    )

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener profesores"
    })
  }

}
module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuarios,
  getProfesores
}