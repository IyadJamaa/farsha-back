const mongoose =require('mongoose') ;

//for create table into db
const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory:{ type: String},
    subSubCategory:{ type: String },
    additions: [{ type: String }],
    price: { type: Number, required: true },
    image: { type: String, required: true }

}, {
    //for date
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports=Product