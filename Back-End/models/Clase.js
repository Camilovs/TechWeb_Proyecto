const {Schema, model} = require('mongoose');

const ClaseSchema = Schema({
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