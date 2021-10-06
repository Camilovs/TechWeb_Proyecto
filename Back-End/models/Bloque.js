const {Schema, model} = require('mongoose');

const BloqueSchema = Schema({
  dia:{
    type:String,
    required:true
  },
  numero:{
    type:Number,
    required:true
  },
  hora_inicio:{
    type:String
  },
  hora_fin:{
    type:String
  }
});

module.exports = model('Bloque', BloqueSchema);