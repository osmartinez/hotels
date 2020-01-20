const mongoose = require('mongoose')
const {Schema} = mongoose
const {get_edad} = require('../helpers/date-helper')

var UserSchema = new Schema({
    cedula : {type: String, required: true},
    nombre:  {type: String, required: true},
    fecha_nacimiento:{type: Date, required:true},
    verificado: { type: Boolean, default: false },
    email: {type: String, required: true},
    foto: {data: Buffer, contentType: String},
    password: {type: String, required:true},
    es_admin:{type:Boolean, required: true, default:false},
    edad:{type:Number, default: function() {
        return get_edad(this.fecha_nacimiento)
      }},
})


UserSchema.methods.comparar_password =  function (password) {
    return password == this.password;
};
  
module.exports = mongoose.model('User', UserSchema);
