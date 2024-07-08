const Storage = require('../models/itemModel');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Storage.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete item by ID
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Storage.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new item
// Add new item
exports.addItem = async (req, res) => {
    const newItem = new Storage({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        dateAdded: req.body.dateAdded,
        dateConsumed: req.body.dateConsumed
    });

    try {
        const savedItem = await newItem.save();
        
        // Check if quantity is 0, then update dateConsumed
        if (savedItem.quantity === 0) {
            savedItem.dateConsumed = Date.now();
            await savedItem.save();
        }

        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'Failed to add item' });
    }
};

exports.UpdatedItem=async (req, res) => {
    try {
        const { quantity } = req.body;
        const updateData = { quantity };
    
        if (quantity === 0) {
          updateData.dateConsumed = new Date();
        }
    
        const item = await Storage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
        res.json(item);
      } catch (error) {
        res.status(500).json({ message: 'Error updating item' });
      }
  }

