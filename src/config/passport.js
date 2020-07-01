const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('client',new LocalStrategy({
    usernameField: 'client',
    passwordField: 'random'
}, async (client, random, done) =>{
//confirmar si coincide el correo del usuario
const user = await User.findOne({client})
if(!user){
    return done(null, false, {message: 'No se encontro este ID en la base de datos'});
}else{
       return done(null, user);

}

}));


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id,(err, user)=>{
        done(err,user);
    })
});





