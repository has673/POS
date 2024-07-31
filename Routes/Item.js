const express = require('express')

const router = express.Router()

const itemController = require('../controllers/Itemcontroller')


router.post('/additem',itemController.addItem)

router.get('/getitem',itemController.allitems)

router.delete('/delitem/:id', itemController.delitem)

module.exports = router;