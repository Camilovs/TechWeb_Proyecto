const { response } = require("express");
const Sala = require("../models/Sala");

//Resolvers para el CRUD de Salas

const crearSala = async(req, res = response) => {
  
  console.log('Creando sala con: ',req.body)
  const sala = new Sala(req.body);

  try {

    if(!req.body.ocupada){
      sala.ocupada = [];
    }
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
        msg: 'Error en bd eliminar sala'
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

    const bloques = req.body.bloques;
    bloques.map((bloque) => {
      bloquesActualizados.push(bloque);
    })

    sala.ocupada = bloquesActualizados;
    await sala.save()

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

const getSalasByAforo = async (req, res = response) => {
  // const {aforo} = req.body
  const aforo = req.params.aforo
  // console.log(aforo2)
  try { 
    const salas = await Sala.find({aforo:{ $gte: aforo}})

    if(!salas || salas.length === 0){
      return res.status(404).json({
        ok:false,
        msg:'No se han encontrado salas'
      })
    }

    res.status(200).json({
      ok:true,
      msg:'Salas encontradas',
      salas
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd, get salas por aforo'
    });
  }
}

const verificarDispHoraria = async(req, res = response) => {

  const idSala = req.params.id
  const {dia, inicio, fin}= req.body
  try {
    const sala = await Sala.findById(idSala);
    const ocupada = sala.ocupada
    if(ocupada.length>0){
      for (let i = 0; i < ocupada.length; i++) {
        if(ocupada[i].dia === dia && 
            (ocupada[i].numero === parseInt(inicio) || ocupada[i].numero === parseInt(fin))){
          console.log('No Hay disponibilidad horaria')
          return res.status(404).json({
            ok:false,
            msg:'No Hay disponibilidad horaria'
          })
        }
      }
      console.log('Hay disponibilidad horaria 1')
      return res.status(200).json({
        ok:true,
        msg:'Hay disponibilidad horaria'
      })
    }
    else{
      console.log('Hay disponibilidad horaria 2')
      return res.status(200).json({
        ok:true,
        msg:'Hay disponibilidad horaria'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error en bd disponibilidad horaria'
    });
  }
  
}

module.exports = {
  crearSala,
  getSala,
  actualizarSala,
  eliminarSala,
  getSalas,
  agregarBloqueOcupado,
  getSalasByAforo,
  verificarDispHoraria
}
