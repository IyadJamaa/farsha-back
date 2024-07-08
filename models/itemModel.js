const mongoose =require('mongoose') ;

//for create table into db
const StorageSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    
    dateAdded: {
      type: Date,
      default: Date.now
    },
    dateConsumed:{
        type:Date,
        default: null
    }
  });
  
  module.exports = mongoose.model('Storage', StorageSchema);