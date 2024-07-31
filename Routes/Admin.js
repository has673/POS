const express = require('express')

const router = express.Router()


const AdminController = require('../controllers/Admincontroller');
const { verifyToken } = require('../middleware/Verify');

router.post("/adduser",verifyToken, AdminController.adduser)

module.exports = router;