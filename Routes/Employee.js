const express = require('express')

const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')

router.post("/addemployee", EmployeeController.addemployee)
router.get('/getemployees',EmployeeController.getemployees)
router.get('/getemployee',EmployeeController.getemployee)
router.delete('/deletemployee',EmployeeController.deleteemployee)
