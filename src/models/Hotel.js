const mongoose = require('mongoose')
const {Schema} = mongoose

const HotelSchema = new Schema({
    nombre : {type: String, required: true},
    latitud:  {type: Number, required: true},
    longitud:{type: Number, required:true},
    provincia:{type:String, required: true},
    canton:{type:String, required: true},
    distrito:{type:String, required: true},
    direccion:{type:String, required: true},
    habilitado:{type:Boolean, default:true}
})

  
module.exports = mongoose.model('Hotel', HotelSchema);
