const {Schema, model} = require('mongoose');

const ModuloSchema = Schema({
  nombre:{
    type:String,
    required:true
  },
  integrantes:{
    type:Number
  },
  horario:{
    inicio: {
      type:Schema.Types.ObjectId,
      ref:'Bloque'
    },
    fin: {
      type:Schema.Types.ObjectId,
      ref:'Bloque'
    }
  },
  profesor:{
    type:Schema.Types.ObjectId,
    ref:'Usuario'
  }
});

module.exports = model('Modulo', ModuloSchema);