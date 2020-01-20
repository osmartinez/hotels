const router = require('express').Router();
const passport = require('passport');
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const mi_email = "mailsender.hoteles@gmail.com"
const mi_pass = "asdfasdf@123"
const { isAuthenticated, isAdmin } = require('../helpers/auth');


// para permitir envio de correos desde gmail: https://myaccount.google.com/lesssecureapps
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: mi_email,
        pass: mi_pass
    }
});


// Models
const User = require('../models/User');
const Token = require('../models/Token');

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/users',isAdmin,async (req,res)=>{
    var users = await User.find()
    res.render('users/view-all', {users: users})
})

router.post('/users/signup', async (req, res) => {
    let errors = [];
    const { cedula, nombre, fecha_nacimiento, email, foto, password } = req.body;

    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
        req.flash('error_msg', 'Este email ya está en uso');
        res.redirect('/users/signin');
    } else {
        const newUser = new User({ cedula,nombre,fecha_nacimiento,email,foto,password});
        await newUser.save();

        const token = new Token({_userId: newUser._id, token:crypto.randomBytes(16).toString('hex')})
        await token.save()

        var transporter = smtpTransport
        var mailOptions = {from:mi_email, to: newUser.email, subject: 'Verificacion email', text: 'Hola '+newUser.nombre+',\n\n' + 'Haz clic aqui para verificar tu cuenta: \nhttp:\/\/' + req.headers.host + '\/token?id=' + token.token + '.\n' };
        await transporter.sendMail(mailOptions)

        req.flash('success_msg', ('Hemos enviado un correo de confirmación a '+newUser.email+'. Por favor verifique su email'));
        res.redirect('/users/signin');
    }

});

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/hotels',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
});

module.exports = router;
