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
    type:Schema.Types.Mixed
  }]
});

module.exports = model('Sala', SalaSchema);