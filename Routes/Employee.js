const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController.js');
const { verifyToken}  = require('../middleware/Verify.js');
// const {verifyToken} = require('../middleware/Verify')
/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The employee managing API
 */

/**
 * @swagger
 * /employee/addemployee:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employee]
 *     requestBody:
 *       description: The employee details to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'John Doe'
 *               email:
 *                 type: string
 *                 example: 'johndoe@example.com'
 *               salary:
 *                 type: integer
 *                 example: 50000
 *               phonenumber:
 *                 type: string
 *                 example: '1234567890'
 *               address:
 *                 type: string
 *                 example: '123 Main St, Anytown, USA'
 *     responses:
 *       201:
 *         description: Employee successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 salary:
 *                   type: integer
 *                 phonenumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/addemployee",verifyToken, EmployeeController.addemployee);

/**
 * @swagger
 * /employee/getemployees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   salary:
 *                     type: integer
 *                   phonenumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('/getemployees',verifyToken,EmployeeController.getemployees);

/**
 * @swagger
 * /employee/getemployee/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the employee to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 salary:
 *                   type: integer
 *                 phonenumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/getemployee/:id', verifyToken, EmployeeController.getemployee);

/**
 * @swagger
 * /employee/deletemployee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the employee to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee successfully deleted
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete('/deletemployee/:id', verifyToken, EmployeeController.deleteemployee);

/**
 * @swagger
 * /employee/editemployee/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the employee to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Jane Doe'
 *               email:
 *                 type: string
 *                 example: 'janedoe@example.com'
 *               salary:
 *                 type: integer
 *                 example: 60000
 *               phonenumber:
 *                 type: string
 *                 example: '0987654321'
 *               address:
 *                 type: string
 *                 example: '456 Elm St, Anytown, USA'
 *     responses:
 *       200:
 *         description: Employee successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 salary:
 *                   type: integer
 *                 phonenumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/editemployee/:id' ,verifyToken, EmployeeController.editemployee);

module.exports = router;
