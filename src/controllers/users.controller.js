const usersCtrl = {};

const passport = require('passport');
const Transaction = require('../models/transaction');
const User = require('../models/user');



usersCtrl.rendersignupForm = (req, res) =>{
    res.render('users/signup');
}

usersCtrl.signup =async (req, res) =>{
    const errors = [];
       const{client,username,email,phone,home} = req.body
 
       const iduser =  await User.findOne({client: client});
       if(iduser){
        errors.push({text: 'Este Identificador ya esta regisrado en nuestra base de datos'});
       }
       if(!req.body.client || !req.body.username || !req.body.email || !req.body.email || !req.body.phone || !req.body.home){
        errors.push({text: 'Para ingresar un nuevo cliente se deben completar todos los campos'});
       }
        if(errors.length>0){
            res.render('users/signup',{
                errors,
                username,
                email,
                phone,
                home,
                client
            })
        }else{
         const newUser = new User({client,username, email, phone, home});
       await newUser.save();
       req.flash('success_msg', 'Registrado Correctamente');
       res.redirect('/users/signin');
   }
}



usersCtrl.renderSigninForm =async (req, res) =>{
    const users = await User.find().sort({createdAt: 'desc'}).limit(10);
    res.render('users/signin',{users});
}

usersCtrl.customers =async (req, res) =>{
    const users = await User.find().sort({createdAt: 'desc'});
    res.render('users/customers',{users});
}

usersCtrl.renderEditForm = async (req,res) =>{
    const users = await User.findById(req.params.id);

    res.render('users/edit-customer', {users});
};

usersCtrl.UpdateUser=async (req,res) =>{
    const users = await  User.findById(req.params.id);
    const {client,username, email, phone, home} =req.body;
   await  User.findByIdAndUpdate(req.params.id, {client,username, email, phone, home});
   req.flash('success_msg', 'Usuario editado satisfactoriamente');
    res.redirect('/customers');
};

usersCtrl.deleteUser =async (req, res) =>{
   await  Transaction.deleteMany( { user:req.params.id } )
   await  User.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Usuario borrado satisfactoriamente');
    res.redirect('/customers');
};



//cierre de cliente
usersCtrl.signin = passport.authenticate('client',{
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})
//cierre de session
usersCtrl.sign = async (req, res) =>{
    key1 = process.env.KEY;
    key2 = req.body.key;
        if (key1 === key2) {
            req.session.key = process.env.KEY;
            res.redirect('/users/signin');

        }else{
            req.flash('error_msg', 'Contraseña Incorrecta');
            res.redirect('/');
        }

   
}


usersCtrl.logout = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Cierre de cliente correcto.');
    res.redirect('signin');
}











module.exports = usersCtrl;