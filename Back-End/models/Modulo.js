const {Schema, model} = require('mongoose');

const ModuloSchema = Schema({
  nombre:{
    type:String,
    required:true
  },
  integrantes:{
    type:Number
  },
  bloque_inicio: {
    type:Schema.Types.ObjectId,
    ref:'Bloque'
  },
  bloque_fin: {
    type:Schema.Types.ObjectId,
    ref:'Bloque'
  },
  profesor:{
    type:Schema.Types.ObjectId,
    ref:'Usuario'
  }
});

module.exports = model('Modulo', ModuloSchema);