const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');
const Token = require('../models/Token');



router.get('/token', async (req, res) => {
  const token_id = req.query.id
  var token  = await Token.findOne({token: token_id})
  var user = await User.findById(token._userId)
  user.verificado = true
  await User.findByIdAndUpdate(user._id,user)
  req.flash('success_msg', 'Ya has confirmado tu email');
        res.redirect('/users/signin');
});

module.exports = router;