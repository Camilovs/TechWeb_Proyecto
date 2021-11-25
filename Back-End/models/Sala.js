const {Schema, model} = require('mongoose');

const SalaSchema = Schema({
  nombre:{
    type:String,
    required:true
  },
  aforo:{
    type:Number
  },
  ocupada:[{
    type:Schema.Types.ObjectId,
    ref:'Bloque'
  }]
});

module.exports = model('Sala', SalaSchema);