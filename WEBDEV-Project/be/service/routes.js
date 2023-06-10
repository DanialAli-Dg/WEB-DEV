const express = require("express");
const serviceController = require('./controller');
const router = express.Router();


 router.post('/createservice', serviceController.createservice);

 router.get('/getservicebyserviceID', serviceController.getservicebyserviceID);

 router.get('/service/getServiceBySalonId/:id', serviceController.getServiceBySalonId);

 router.delete('/deleteservicebyserviceid', serviceController.deleteservicebyserviceid);

 router.get('/getServices', serviceController.getAllServices);


module.exports = router;