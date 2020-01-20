const express = require('express');
const router = express.Router();

// Models
const Hotel = require('../models/Hotel');
const Eval = require('../models/Eval');

// Helpers
const { isAuthenticated, isAdmin } = require('../helpers/auth');


router.get('/hotels/add', isAdmin, (req, res) => {
    res.render('hotels/create');
});

router.post('/hotels/create', isAdmin, async (req, res) => {
    const { nombre,latitud,longitud,provincia,canton,distrito,direccion } = req.body;
    const errors = [];

    const newHotel = new Hotel({ nombre,latitud,longitud,provincia,canton,distrito,direccion });
    await newHotel.save();
    req.flash('success_msg', 'Hotel añadido');
    res.redirect('/hotels');

});

router.post('/hotels/eval', isAuthenticated, async (req, res) => {
    const { id,puntuacionComida,puntuacionLimpieza,puntuacionHabitaciones,puntuacionServicio,puntuacionInfraestructura } = req.body;
    const newEval = new Eval({
        comida:puntuacionComida,
        calidad_servicio:puntuacionServicio,
        habitaciones: puntuacionHabitaciones,
        infraestructura: puntuacionInfraestructura,
        limpieza: puntuacionLimpieza,
        _hotelId: id,
        _userId: req.user.id,
    })
    await newEval.save()
    res.send(true)

});

router.get('/hotels', isAuthenticated, async (req, res) => {
    var hotels = await Hotel.find().lean().exec()

    for(var i in hotels){
        var valoraciones = await Eval.find({'_hotelId':hotels[i]._id}).lean().exec()
        if(valoraciones.length>0){
            let sumaValoraciones = 0
            for(let valoracion of valoraciones){
                sumaValoraciones+=valoracion.puntuacion_media
            }
            hotels[i].valoracion_media = sumaValoraciones/valoraciones.length
            hotels[i].valoracion = Math.round(hotels[i].valoracion_media)
            hotels[i].count_valoraciones = valoraciones.length
            hotels[i].count_vacias = 5-hotels[i].valoracion
        }
        else{
            hotels[i].count_vacias = 5
        }
    }

    res.render('hotels/view-all', { hotels});
});


router.post('/hotels/eliminar/:id', isAdmin, async (req, res) => {
    await Hotel.findByIdAndRemove(req.params.id)
    req.flash('success_msg', 'Hotel eliminado');
    res.redirect('/hotels');
});

router.post('/hotels/habilitar/:id', isAdmin, async (req, res) => {
    var hotel =await Hotel.findById(req.params.id)
    hotel.habilitado = true
    await Hotel.findByIdAndUpdate(req.params.id, hotel);
    req.flash('success_msg', 'Hotel habilitado');
    res.redirect('/hotels');
});

router.post('/hotels/deshabilitar/:id', isAdmin, async (req, res) => {
    var hotel =await Hotel.findById(req.params.id)
    hotel.habilitado = false
    await Hotel.findByIdAndUpdate(req.params.id, hotel);
    req.flash('success_msg', 'Hotel deshabilitado');
    res.redirect('/hotels');
});

module.exports = router;
