const { response } = require("express");
const Modulo = require("../models/Modulo");


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
  const {bloque_inicio, bloque_fin, profesor} = value;
  try {
    const modulo = await Modulo.findById(moduloId);

    if(!modulo){
      return res.status(404).json({
        ok:false,
        msg:"el modulo no existe"
      })
    }

    let bloque = await Modulo.findById(req.body.bloque_inicio);
  } catch (error) {
    
  }
  
}

module.exports = {
  crearModulo
}