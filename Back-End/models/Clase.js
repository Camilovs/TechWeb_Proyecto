const {Schema, model} = require('mongoose');

const ClaseSchema = Schema({
  profesor:{
    type:Schema.Types.ObjectId,
    ref:'Usuario'
  },
  profesorName:String,
  horario_dia:String,
  horario_inicio:Number,
  horario_fin:Number,
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