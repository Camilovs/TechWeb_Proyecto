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
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar modulo'
    });
  }
  
}

const getModulos = async(req, res = response) => {
  try {
    const modulos = await Modulo.find();
    if(!modulos || modulos.length === 0){
      return res.status(404).json({
        ok:false,
        msg:"No existen modulos"
      })
    }
    res.json({
      ok:true,
      msg:"Modulos encontrados",
      modulos
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener modulos"
    })
  }
}

const eliminarModulo = async(req, res = response) => {
  
  const moduloId = req.params.id;

  try {
    const modulo = await Modulo.findById(moduloId);

    if (!modulo) {

      res.status(400).json({
        ok:false,
        msg:'El modulo no existe'
      })
      
    }

    await Modulo.findByIdAndDelete(moduloId);

    res.json({
      ok:true,
      msg:'Modulo eliminado correctamente'
    })
  } catch (error) {
    
  }
 

}


module.exports = {
  crearModulo,
  actualizarModulo,
  getModulos,
  eliminarModulo
}