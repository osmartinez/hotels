const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/hoteles', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('CONEXION CORRECTA CON BBDD'))
  .catch(err => console.error(err));
