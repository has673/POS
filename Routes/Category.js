const express = require('express')

const router = express.Router()

const CatController = require('../controllers/CategoryController')

router.post("/create", CatController.createitem)

module.exports = router;