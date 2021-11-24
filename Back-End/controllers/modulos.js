const { response } = require("express");
const Bloque = require("../models/Bloque");
const Modulo = require("../models/Modulo");
const Usuario = require("../models/Usuario");


const crearModulo = async(req, res = response) => {
  
  const {bloque_inicio, bloque_fin} = req.body

  try {
    let bloque = await Bloque.findOne(
      {dia:bloque_inicio.dia, numero:bloque_inicio.numero+1}
    );
    const idbloque_inicio = bloque.id;
    if(!bloque){
      return res.status(404).json({
        ok:false,
        msg:"el bloque inicio no existe"
      })
    }
    bloque = await Bloque.findOne(
      {dia:bloque_fin.dia, numero:bloque_fin.numero+1}
    )
    const idbloque_fin = bloque.id;
    if(!bloque){
      return res.status(404).json({
        ok:false,
        msg:"el bloque fin no existe"
      })
    }
  
    const newModulo = {
      ...req.body,
      bloque_inicio:idbloque_inicio,
      bloque_fin:idbloque_fin
    }

    const modulo = new Modulo(newModulo);
    await modulo.save();
    res.status(200).json({
      ok:true,
      msg:"Creacion de modulo",
      modulo
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok:false,
      msg:error
    })
  }
}

const actualizarModulo = async(req, res = response) => {

  const moduloId = req.params.id;
  const {bloque_inicio, bloque_fin} = req.body;
  try {
    const modulo = await Modulo.findById(moduloId);
    if(!modulo){
      return res.status(404).json({
        ok:false,
        msg:"el modulo no existe"
      })
    }

    let bloque = await Bloque.findOne(
      {dia:bloque_inicio.dia, numero:bloque_inicio.numero+1}
    );
    const idbloque_inicio = bloque.id;
    if(!bloque){
      return res.status(404).json({
        ok:false,
        msg:"el bloque inicio no existe"
      })
    }

    bloque = await Bloque.findOne(
      {dia:bloque_fin.dia, numero:bloque_fin.numero+1}
    )
    const idbloque_fin = bloque.id;
    if(!bloque){
      return res.status(404).json({
        ok:false,
        msg:"el bloque fin no existe"
      })
    }
    const newModulo = {
      ...req.body,
      bloque_inicio:idbloque_inicio,
      bloque_fin:idbloque_fin
    }
    const moduloUpdate = await 
      Modulo.findByIdAndUpdate(moduloId, newModulo, {new:true});
    
    res.status(200).json({
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
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, eliminar modulos"
    })
  }
 

}

const getModuloById = async (req, res=response) =>{
  const moduloId = req.params.id;
  try {
    const modulo = await Modulo.findById(moduloId);
    if(!modulo){
      return res.status(404).json({
        ok:false,
        msg:"No existe el modulo"
      })
    }
    // const profeid = modulo.profesor;
    // const profe = await Usuario.findById(profeid);
    // if(!profe){
    //   return res.status(404).json({
    //     ok:false,
    //     msg:"No existe el profesor"
    //   })
    // }
    const idbloque_inicio = modulo.bloque_inicio;
    const idbloque_fin = modulo.bloque_fin;
    let bloque = await Bloque.findById(idbloque_inicio)
    
    const data_bloque_inicio = {
      dia:bloque.dia,
      numero:bloque.numero-1
    }

    bloque = await Bloque.findById(idbloque_fin)
    const data_bloque_fin = {
      dia:bloque.dia,
      numero:bloque.numero-1
    }

    const dataModulo = {
      ...modulo._doc,
      // profesor: profe.nombre,
      bloque_inicio: data_bloque_inicio,
      bloque_fin:data_bloque_fin
    }
    console.log(dataModulo)
    res.status(200).json({
      ok:true,
      msg:'Modulo encontrado',
      modulo:dataModulo
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener modulo por id"
    })
  }
}

module.exports = {
  crearModulo,
  actualizarModulo,
  getModulos,
  eliminarModulo,
  getModuloById
}