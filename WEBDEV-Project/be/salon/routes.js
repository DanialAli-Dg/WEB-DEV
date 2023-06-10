const express = require("express");
const salonController = require('./controller');
const router = express.Router();


router.post('/signup', salonController.signup);
router.post('/login', salonController.login);
router.post('/verify-otp', salonController.verifyOTP)
router.post('/reset-password', salonController.resetPassword);
router.post('/forgot-password', salonController.forgetPassword);

router.post('/createsalon', salonController.createSalon);

router.get('/getallsalons',salonController.getAllSaloons);




module.exports = router;