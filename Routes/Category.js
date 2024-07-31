const express = require('express')

const router = express.Router()

const CatController = require('../controllers/CategoryController')
const { verifyToken } = require('../middleware/Verify')


router.post("/create",verifyToken, CatController.addCategory)
router.get('/get',verifyToken,CatController.getcat)
router.put('/update',verifyToken,CatController.editcat)
router.get('/getmenu/:id',verifyToken,CatController.getmenu)
module.exports = router;