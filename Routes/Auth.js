const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/Authcontroller')

router.post("/signuo", AuthController.signup)

module.exports = router;