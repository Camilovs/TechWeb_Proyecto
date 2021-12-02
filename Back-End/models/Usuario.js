const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  nombre:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true  
  },
  pass:{
    type:String,
    required: true
  },
  rol: {
    type: String,
    enum: ["Admin", "Encargado", "Profesor", "Estudiante"]
  },
  verificado:{
    type:Boolean
  },
  modulosInscritos:[{
    type:Schema.Types.Mixed
  }]
  
});

module.exports = model('Usuario', UsuarioSchema);