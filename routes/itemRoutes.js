const express = require('express');
const router = express.Router();
const storageController = require('../controllers/itemController');

// Get all items
router.get('/items', storageController.getAllItems);

// Delete item by ID
router.delete('/items/:id', storageController.deleteItem);

// Add new item
router.post('/items', storageController.addItem);
router.put('/items/:id',storageController.UpdatedItem)
module.exports = router;
