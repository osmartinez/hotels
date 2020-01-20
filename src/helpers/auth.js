const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() ) {
    if(req.user.verificado){
      return next();
    }
    else{
      req.flash('error_msg', 'VERIFICA TU EMAIL');
    }
  }
  else{
    req.flash('error_msg', 'NO ESTAS AUTENTICADO');
  }
  res.redirect('/users/signin');
};

helpers.isAdmin = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.es_admin){
        return next()
    }
    req.flash('error_msg', 'NO ESTAS AUTORIZADO');
    res.redirect('/users/signin');
}

module.exports = helpers;
