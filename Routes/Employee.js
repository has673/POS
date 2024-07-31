const express = require('express')

const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')

router.post("/addemployee", EmployeeController.addemployee)
router.get('/getemployees',EmployeeController.getemployees)
router.get('/getemployee/:id',EmployeeController.getemployee)
router.delete('/deletemployee/:id',EmployeeController.deleteemployee)
router.put('/editemployee',EmployeeController.editemployee)

module.exports = router;