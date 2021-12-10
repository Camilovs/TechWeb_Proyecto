const {response} = require('express');
const Institucion = require('../models/Institucion');
const Usuario = require('../models/Usuario');

const crearInstitucion = async(req, res = response) => {

  try {
    const encargadoId = req.body.encargado;
    const encargado = await Usuario.findById(encargadoId);
    if(!encargado){
      return res.status(404).json({
        ok:false,
        msg:"el encargado no existe"
      })
    }
    console.log(encargado)
    if(encargado.rol !== 'Encargado'){
      return res.status(404).json({
        ok:false,
        msg:"el encargado es invalido"
      })
    }

    const institucion = new Institucion({
      nombre:req.body.nombre,
      encargados:[
        {
          id:encargadoId,
          nombre:encargado.nombre,
          email:encargado.email,
        }
      ]
    })
    await institucion.save()
    res.status(200).json({
      ok:true,
      msg:"Creacion de institucion",
      institucion
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error en bd, crear institucion'
    });
  }
  
}

const eliminarInstitucion = async(req, res = response) => {
  
  const instId = req.params.id;
  try {
    const institucion = await Institucion.findById(instId);

    if (!institucion) {

      res.status(400).json({
        ok:false,
        msg:'La institucion no existe'
      })
      
    }

    await Institucion.findByIdAndDelete(instId);

    res.json({
      ok:true,
      msg:'Institucion eliminada correctamente'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, eliminar modulos"
    })
  }
}

const getInstituciones = async(req, res=response) => {
  try {
    const instituciones = await Institucion.find();
    if(!instituciones || instituciones.length === 0){
      return res.status(404).json({
        ok:false,
        msg:"No existen instituciones"
      })
    }
    res.json({
      ok:true,
      msg:"Instituciones encontradas",
      instituciones
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener instituciones"
    })
  }
}



module.exports = {
  crearInstitucion,
  eliminarInstitucion,
  getInstituciones
}