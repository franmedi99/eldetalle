const {Router} = require('express');
const router = Router();


const {renderindex} = require('../controllers/index.controller')

router.get('/', renderindex);




module.exports = router;