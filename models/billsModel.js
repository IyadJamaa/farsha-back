const mongoose =require('mongoose') ;


//for create table into db
const billsSchema = new mongoose.Schema({
    tableNumber:{ type: String, required: true },
    customerName: { type: String, required: true },
   
    subTotal: { type: Number, required: true },
   
    cartItems: { type: Array, required: true }

}, {
    //for date
    timestamps: true
});

  
const Bills = mongoose.model("Bills", billsSchema);
module.exports=Bills







// const mongoose = require('mongoose');

// // Create table into db
// const billsSchema = new mongoose.Schema({
//     tableNumber: { type: String, required: true },
//     customerName: { type: String, required: true },
//     subTotal: { type: Number, required: true },
//     cartItems: { type: Array, required: true }
// }, {
//     // For date
//     timestamps: true
// });

// const Bills = mongoose.model("Bills", billsSchema);
// module.exports = Bills;
