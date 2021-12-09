const { response } = require("express");
const Semestre = require("../models/Semestre");

const crearSemestre = async(req, res=response) => {

  try {
    const semestre = new Semestre(req.body);
    await semestre.save()
    res.status(200).json({
      ok:true,
      msg:'Semestre creado',
      semestre
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, creando semestre"
    })
  }
  
}

const getSemestres = async(req, res=response) => {

  try {
    const semestres = await Semestre.find()
    if(!semestres || semestres.length ===0){
      return res.status(404).json({
        ok:false,
        msg:"No existen semestres"
      })
    }
    res.status(200).json({
      ok:true,
      msg:'Semestres encontrados',
      semestres
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, get semestres"
    })
  }
  
}

const getSemestreActual = async(req, res = response) => {
  try {
    const semestre = await Semestre.find({ actual: 1});
    console.log(semestre)
    return res.status(200).json({
      ok:true,
      msg:'Semestre actual',
      semestre
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, get semestre actual"
    })
  }
}

module.exports = {
  crearSemestre,
  getSemestres,
  getSemestreActual
}