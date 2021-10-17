const { response } = require("express");
const Bloque = require("../models/Bloque");
const Modulo = require("../models/Modulo");
const Usuario = require("../models/Usuario");


const crearModulo = async(req, res = response) => {

  try {
    
    const modulo = new Modulo(req.body);
    await modulo.save();

    res.status(201).json({
      ok:true,
      msg:'creacion de modulo',
      modulo
    })

  } catch (error) {
    
  }
  
}

const actualizarModulo = async(req, res = response) => {

  const moduloId = req.params.id;
  const {bloque_inicio, bloque_fin, profesor} = req.body;
  try {
    const modulo = await Modulo.findById(moduloId);

    if(!modulo){
      return res.status(404).json({
        ok:false,
        msg:"el modulo no existe"
      })
    }

    if(bloque_inicio){
      let bloqueInicio = await Bloque.findById(bloque_inicio) ;
      if(!bloqueInicio){
        return res.status(404).json({
          ok:false,
          msg:"el bloque de inicio no existe"
        })
      }
    }

    if(bloque_fin){
      const bloqueFin = await Bloque.findById(bloque_fin) ;
      if(!bloqueFin){
        return res.status(404).json({
          ok:false,
          msg:"el bloque de fin no existe"
        })
      }
    }
    if(profesor){
      const profe = await Usuario.findById(profesor);
      if(!profe){
        return res.status(404).json({
          ok:false,
          msg:"el profesor no existe"
        })
      }
    }
    const moduloUpdate = await 
      Modulo.findByIdAndUpdate(moduloId, req.body, {new:true});
    
    res.json({
      ok:true,
      msg:"Modulo actualizado",
      modulo:moduloUpdate
    })
  } catch (error) {
    
  }
  
}

module.exports = {
  crearModulo,
  actualizarModulo
}