const { Router } = require('express');
const router = Router();

const { renderNoteForm,
     createNewNote,
      renderNotes,
       renderEditForm, 
       UpdateNote, 
       deletenote,
       rendertransaction,renderaction,deleteallnotes }
        = require('../controllers/notes.controller');

        const {createPdf} = require('../controllers/pup');
        const { isAuthenticated } = require('../helpers/auth');

//new transaction
router.get('/notes/add',isAuthenticated, renderNoteForm);

router.post('/notes/new-note',isAuthenticated, createNewNote);


//screenshot of user
router.post('/screen',isAuthenticated, createPdf);






//new pay to client
router.get('/notes/addT',isAuthenticated, rendertransaction);


//delete all transactions of one client
router.get('/notes/actions',isAuthenticated, renderaction);

router.post('/notes/deleteall',isAuthenticated ,deleteallnotes);


//get all transaction
router.get('/notes',isAuthenticated, renderNotes);


//edit transaction
router.get('/notes/edit/:id',isAuthenticated, renderEditForm);

router.put('/notes/edit/:id',isAuthenticated, UpdateNote);


//delete transaction
router.delete('/notes/delete/:id',isAuthenticated, deletenote)


module.exports = router;