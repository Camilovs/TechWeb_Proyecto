const { response } = require("express");
const { bloques, bloques_dias } = require("../api/bloques");
const Bloque = require("../models/Bloque");

const crearBloques = async(req, res = response) => {
  try {
    for (let i = 0; i < bloques_dias.length; i++) {

      bloques.map( async bloque => {

        const newBloque = {
          dia:bloques_dias[i],
          ...bloque
        };
        // console.log(newBloque)
        
        const saveBloque = new Bloque(newBloque);
        await saveBloque.save();
      })
    }
    res.status(200).json({
      ok:true,
      msg:"Bloques agregados"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"Error creando bloques"
    })
  }


}

const getBloques = async(req,res = response) => {
  
  try {
    
    const bloques = await Bloque.find();

    if(!bloques){
      return res.status(400).json({
        ok:false,
        msg:"No hay bloques"
      })
    }

    res.status(200).json({
      ok:true,
      msg:"Bloques encontrados",
      bloques
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:"error en bd, obtener bloques"
    })
  }
}

module.exports = {
  crearBloques,
  getBloques
}

