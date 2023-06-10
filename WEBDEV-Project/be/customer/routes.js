const express = require("express");
const customerController = require('./controller');
const router = express.Router();


router.post('/signup', customerController.signup);
router.post('/login', customerController.login);
router.post('/verify-otp', customerController.verifyOTP)
router.post('/reset-password', customerController.resetPassword);
router.post('/forgot-password', customerController.forgetPassword);



module.exports = router;