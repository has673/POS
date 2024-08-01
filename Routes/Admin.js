const express = require('express')

const router = express.Router()

const adminController = require('../controllers/adminController')

const { verifyToken } = require('../middleware/Verify');

 router.post("/adduser",verifyToken, adminController.addUser)

module.exports = router;