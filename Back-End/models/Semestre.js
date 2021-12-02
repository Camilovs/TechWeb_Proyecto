const {Schema, model} = require('mongoose');

const SemestreSchema = Schema({
  anio:{
    type:String,
    required:true
  },
  numero:{
    type:Number,
    required:true
  },
  actual:{
    type:Boolean
  }
});

module.exports = model('Semestre', SemestreSchema);