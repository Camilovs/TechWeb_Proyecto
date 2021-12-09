const {Schema, model} = require('mongoose');

const InstitucionSchema = Schema({
  nombre:{
    type:String,
    required:true
  },
  encargados:[{
    type:Schema.Types.Mixed
  }]
});

module.exports = model('Institucion', InstitucionSchema);