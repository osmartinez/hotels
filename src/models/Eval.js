const mongoose = require('mongoose')
const {Schema} = mongoose

var EvalSchema = new Schema({
    comida : {type: Number, required: true},
    calidad_servicio:  {type: Number, required: true},
    habitaciones:{type: Number, required:true},
    infraestructura:{type:Number, required: true},
    limpieza:{type:Number, required: true},
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    _hotelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hotel' },
    puntuacion_media:{type:Number, default: function() {
        return (this.comida+this.calidad_servicio+this.habitaciones+this.infraestructura+this.limpieza)/5 
      }},
})



module.exports = mongoose.model('Eval', EvalSchema);
