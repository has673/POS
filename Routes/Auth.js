

const express = require('express');

const passport = require('passport');

const router = express.Router();

const AuthController = require('../controllers/authcontroller.js');
const {verifyToken} = require('../middleware/Verify.js')
const{otplimiter}= require('../rateLimiter.js')

router.post("/signup", AuthController.signup);
router.post('/login', AuthController.login);
router.put('/recover', AuthController.recoverPassword);
router.post('/verify_otp',otplimiter, AuthController.verifyotp);

router.put('/new_otp',otplimiter,AuthController.newotp)


// // Callback URL for handling the OAuth 2.0 response


router.get('/checksignin', verifyToken , (req,res)=>{
    return res.status(200).send({ok:true})
})
module.exports = router;
