

const express = require('express');

const passport = require('passport');

const router = express.Router();

const AuthController = require('../controllers/authController.js');
const {verifyToken} = require('../middleware/Verify.js')

router.post("/signup", AuthController.signup);
router.post('/login', AuthController.login);
router.put('/recover', AuthController.recoverPassword);
router.post('/verify_otp', AuthController.verifyotp);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for handling the OAuth 2.0 response
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect or handle the user as desired
  res.redirect('/');
});


router.get('/checksignin', verifyToken , (req,res)=>{
    return res.status(200).send({ok:true})
})
module.exports = router;
