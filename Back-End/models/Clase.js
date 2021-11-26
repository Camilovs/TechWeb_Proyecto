const {Schema, model} = require('mongoose');

const ClaseSchema = Schema({
  horario:{
    inicio: {
      dia:String,
      bloque:Number
    },
    fin: {
      dia:String,
      bloque:Number
    }
  },
  modulo:{
    type:Schema.Types.ObjectId,
    ref:'Modulo'
  },
  tipo:{
    type:String,
    enum:['Unica','Recurrente']
  },
  aceptada:{
    type:Boolean
  }
});

module.exports = model('Clase', ClaseSchema);