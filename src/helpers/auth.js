const helpers = {};

helpers.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
       
        return next();
    }
    req.flash('error_msg', 'No estas autorizado a ver esa seccion');
    res.redirect('/');
}



helpers.conectado = (req, res, next)=>{
    if(req.session.key===process.env.KEY){
       
        return next();
    }
    req.flash('error_msg', 'Solo personal autorizado');
    res.redirect('/');
}



module.exports = helpers;