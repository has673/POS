const express = require('express')

const router = express.Router()

const CatController = require('../controllers/CategoryController')

router.post("/create", CatController.addCategory)
router.get('/get',CatController.getcat)
router.put('/update',CatController.editcat)
router.get('/getmenu/:id',CatController.getmenu)
module.exports = router;