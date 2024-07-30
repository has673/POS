const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/Authcontroller')

router.post("/signup", AuthController.signup)
router.post('/login',AuthController.login)
router.put('/recover',AuthController.recoverPassword)

module.exports = router;