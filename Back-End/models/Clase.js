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
  moduloNombre:String,
  tipo:{
    type:String,
    enum:['Unica','Recurrente']
  },
  aprobada:{
    type:Boolean
  },
  sala:{
    type:Schema.Types.ObjectId,
    ref:'Sala'
  },
  salaNombre:String,
  fechaUnica:Date
});

module.exports = model('Clase', ClaseSchema);