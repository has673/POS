const express = require('express')

const router = express.Router()

const categoryController = require('../controllers/categoryController')

const { verifyToken } = require('../middleware/Verify')


router.post("/create",verifyToken, categoryController.addCategory)
router.get('/get',verifyToken, categoryController.getCat)
router.put('/update',verifyToken, categoryController.editCat)
router.get('/getmenu/:id',verifyToken, categoryController.getMenu)
module.exports = router;