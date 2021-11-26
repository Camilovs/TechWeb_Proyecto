const {Schema, model} = require('mongoose');

const ClaseSchema = Schema({
  modulo:{
    type:Schema.Types.ObjectId,
    ref:'Modulo'
  },
  tipo:{
    type:String,
    enum:['Unica','Recurrente']
  }
});

module.exports = model('Clase', ClaseSchema);