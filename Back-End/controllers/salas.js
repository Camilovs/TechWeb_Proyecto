
const { response } = require("express");
const Sala = require("../models/Sala");

//Resolvers para el CRUD de Salas

const crearSala = async(req, res = response) => {

  const sala = new Sala(req.body);

  try {

    const salaGuardada = await sala.save();

    res.json({
      ok:true,
      msg:'Sala guardada correctamente',
      sala:salaGuardada
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd guardando la sala"
    })
  }

}

const getSala = async(req, res = response) => {

  const salaId = req.params.id;

  try {
    
    const sala = await Sala.findById(salaId);

    if(!sala){
      return res.status(404).json({
        ok:false,
        msg:"La sala no existe"
      })
    }

    res.json({
      ok:true,
      msg:"Sala encontrada",
      sala
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener sala"
    })
  }
}

const getSalas = async(req, res = response) => {

  try {
    const salas = await Sala.find();

    if(!salas){
      return res.status(404).json({
        ok:false,
        msg:"No existen salas"
      })
    }

    res.json({
      ok:true,
      msg:"Salas encontradas",
      salas
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener salas"
    })
  }

}

const actualizarSala = async(req, res = response) => {

  const salaId = req.params.id;

  try {
    const sala = await Sala.findById(salaId);

    if(!sala){
      return res.status(404).json({
        ok:false,
        msg:"La sala no existe"
      })
    }

    const salaUpdate = await Sala.findByIdAndUpdate(salaId, req.body, {new:true} );

    res.json({
      ok:true,
      msg:"Sala actualizada",
      sala:salaUpdate
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar sala'
    });
  }

}

const eliminarSala = async(req, res = response) => {

  const salaId = req.params.id;
  
  try {
    const sala = await Sala.findById(salaId);

    if(!sala){
      return res.status(404).json({
        ok:false,
        msg:"La sala no existe"
      })
    }

    await Sala.findByIdAndDelete( salaId );

    res.json({
      ok:true,
      msg:"Sala eliminada"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar sala'
    });
  }

}

const actualizarAforo = async(req,res = response) => {
  
  const salaId = req.params.id;
  try {
    
    const sala = await Sala.findById(salaId);

    if(!sala){
      return res.status(404).json({
        ok:false,
        msg:"La sala no existe"
      })
    }

    // sala.aforo = req.aforo;
    // await sala.save()
    await Sala.updateOne({_id:salaId},{aforo:req.body.aforo});

    res.json({
      ok:true,
      msg:"Aforo actualizado"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar aforo'
    });
  }

}

const agregarBloqueOcupado = async(req, res = response) => {

  const salaId = req.params.id;
  
  try {
    
    const sala = await Sala.findById(salaId);

    if(!sala){
      return res.status(404).json({
        ok:false,
        msg:"La sala no existe"
      })
    }

    const bloquesActualizados = [
      ...sala.ocupada
    ];

    bloquesActualizados.push(req.body.ocupada);

    await Sala.updateOne({_id:salaId},{ocupada:bloquesActualizados});

    res.json({
      ok:true,
      msg:"Bloque ocupado actualizado"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd actualizar bloques ocupados'
    });
  }

  
}

module.exports = {
  crearSala,
  getSala,
  actualizarSala,
  eliminarSala,
  getSalas,
  actualizarAforo,
  agregarBloqueOcupado
}
