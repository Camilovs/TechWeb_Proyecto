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
  },
  inscritos:[{
    type:Schema.Types.Mixed
  }],
  clases:[{
    type:Schema.Types.Mixed
  }],
  semestre:{
    type:Schema.Types.ObjectId,
    ref:'Semestre'
  }
});

module.exports = model('Modulo', ModuloSchema);