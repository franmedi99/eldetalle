const {Router} = require('express');
const router = Router();
const {rendersignupForm, renderSigninForm,customers,renderEditForm, UpdateUser,deleteUser, signup, signin,sign, logout}  = require('../controllers/users.controller')

const { conectado } = require('../helpers/auth');

router.get('/users/signup',conectado, rendersignupForm);

router.post('/users/signup',conectado,signup);


router.get('/users/signin',conectado, renderSigninForm);

router.get('/customers',conectado, customers);

//edit customer
router.get('/customers/edit/:id',conectado, renderEditForm);

 router.put('/customers/edit/:id',conectado, UpdateUser);

 //delete transaction
router.delete('/customers/delete/:id',conectado, deleteUser)



router.post('/users/signin',conectado,signin);

router.post('/users/sign',sign);


router.get('/users/logout', logout);



module.exports = router;