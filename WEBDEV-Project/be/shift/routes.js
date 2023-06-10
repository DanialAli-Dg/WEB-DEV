const express = require("express");
const shiftController = require('./controller');
const router = express.Router();


router.post('/createshift', shiftController.createshift);

// we are going to use this API of create 

router.get('/getshiftid', shiftController.getshiftsbyshiftID );

router.get('/getserviceid', shiftController.getshiftbyserviceid);

router.get('/getAllshifts' , shiftController.getAllShifts)

router.delete('/deleteshift', shiftController.deleteshiftsbyshiftid);


module.exports = router;