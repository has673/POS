

const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/Authcontroller');
const {verifyToken} = require('../middleware/Verify.js')

router.post("/signup", AuthController.signup);
router.post('/login', AuthController.login);
router.put('/recover', AuthController.recoverPassword);
router.post('/verify_otp', AuthController.verifyotp);


router.get('/checksignin', verifyToken , (req,res)=>{
    return res.status(200).send({ok:true})
})
module.exports = router;
