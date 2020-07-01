const notesCtrl = {};
const Transaction = require('../models/transaction');
const User = require('../models/user');



notesCtrl.rendertransaction = (req,res) =>{
    res.render('notes/new-transaction');
};


notesCtrl.renderNoteForm = (req,res) =>{
    res.render('notes/new-note');
};



notesCtrl.renderaction =  async(req,res) =>{
    const notes = await Transaction.find({user: req.user.id}).sort({createdAt: 'desc'});
    const subtotal = await Transaction.aggregate([{$match:{user: req.user.id}},{$group:{_id:"$user",transaction:{$sum:"$transaction"}}}]);

    res.render('notes/actions',{notes,subtotal});
};




notesCtrl.createNewNote= async (req,res) =>{
    const{product,date,transaction,tipo} = req.body
    const newNote =   new Transaction({
        product,
        date,
        transaction,
        tipo
    })
    newNote.user= req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Transaccion agregada satisfactoriamente');
    res.redirect('/notes');
};



notesCtrl.renderNotes= async(req,res) =>{
    const usuario = await User.find({_id:req.user.id});
    const notes = await Transaction.find({user: req.user.id}).sort({createdAt: 'desc'});
    const subtotal = await Transaction.aggregate([{$match:{user: req.user.id}},{$group:{_id:"$user",transaction:{$sum:"$transaction"}}}]);

    res.render('notes/allnotes',{notes,subtotal,usuario});
};

notesCtrl.renderEditForm=async (req,res) =>{
    const note = await  Transaction.findById(req.params.id);
     if(note.user != req.user.id){
        req.flash('error_msg','No estas autorizado a esa seccion')
         return res.redirect('/notes');
     }
    res.render('notes/edit-note', {note});
};

notesCtrl.UpdateNote=async (req,res) =>{
    const note = await  Transaction.findById(req.params.id);
    const {product,date,transaction} =req.body;
   await  Transaction.findByIdAndUpdate(req.params.id, {product,date,transaction});
   req.flash('success_msg', 'Recibo editado satisfactoriamente');
    res.redirect('/notes');
};

notesCtrl.deletenote =async (req, res) =>{

   await  Transaction.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Recibo eliminado satisfactoriamente');
    res.redirect('/notes');
};

notesCtrl.deleteallnotes =async (req, res) =>{
   
   await  Transaction.deleteMany( { user:req.user.id } )
   
   req.flash('success_msg', 'Todas las transacciones han sido eliminadas satisfactoriamente');
    res.redirect('/notes');
};
module.exports = notesCtrl;