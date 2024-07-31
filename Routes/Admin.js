const express = require('express')

const router = express.Router()


const AdminController = require('../controllers/Admincontroller')

router.post("/adduser", AdminController.adduser)

module.exports = router;