const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/Authcontroller')

router.post("/signup", AuthController.signup)
router.post('/login',AuthController.l)
router.put('/recover',AuthController.recoverPassword)

module.exports = router;