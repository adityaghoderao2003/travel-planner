const express= require('express');
const router = express.Router()
const verifyToken = require("../middleware/authmidleware");

const {createtrip , gettrip , updatetrip , deletetrip , gettripbyId} = require('../controllers/tripController')

router.get('/viewtrip', verifyToken , gettrip);
router.get('/viewtrip/:id',verifyToken,  gettripbyId);
router.post('/createtrip', verifyToken , createtrip);
router.put('/updatetrip/:id', verifyToken , updatetrip);
router.delete('/deletetrip/:id', verifyToken , deletetrip);

module.exports = router
