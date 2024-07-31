const express = require('express');
const router = express.Router();
const itemController = require('../controllers/Itemcontroller');
const { verifyToken } = require('../middleware/Verify');

/**
 * @swagger
 * tags:
 *   name: Item
 *   description: The item managing API
 */

/**
 * @swagger
 * /item/additem:
 *   post:
 *     summary: Add a new item
 *     tags: [Item]
 *     requestBody:
 *       description: The item details to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Fajita'
 *               description:
 *                 type: string
 *                 example: 'abcsjdsjkldn'
 *               price:
 *                 type: number
 *                 example: 100
 *               availability:
 *                 type: string
 *                 enum: [IN_STOCK, OUT_OF_STOCK]
 *                 example: 'IN_STOCK'
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Item successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 availability:
 *                   type: string
 *                 categoryId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input
 */
router.post('/additem',verifyToken ,itemController.addItem);

/**
 * @swagger
 * /item/getitem:
 *   get:
 *     summary: Get all items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: A list of items
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
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   availability:
 *                     type: string
 *                   categoryId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('/getitem', verifyToken,itemController.allitems);

/**
 * @swagger
 * /item/delitem:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The ID of the item to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item successfully deleted
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delitem', verifyToken, itemController.delitem);

module.exports = router;
