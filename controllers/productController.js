// const  Product = require ("../models/productModel.js");
// const path = require('path')

// //for add or fetch
//  const getProductController = async (req, res) => {
//     try {

//         const products = await Product.find();
//         res.status(200).send(products);

//     } catch(error) {
//         console.log(error);
//     }
// }

// //for add
// const addProductController = async (req, res) => {
//     try {
//         const { name, category, subCategory, subSubCategory, price , additions } = req.body;
//         const image = req.file.path; // Corrected variable name
    
//         const newProduct = new Product({
//           name,
//           category,
//           subCategory,
//           subSubCategory,
//           price,
//           additions,
//           image // Corrected variable name
//         });
    
//         await newProduct.save();
//         const imageUrl = `/uploads/${image}`; // Construct the image URL
//         res.json({ success: true, message: "Product added successfully", imageUrl }); // Corrected variable name
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error uploading product" });
//     }
// };

// //for update
// const updateProductController = async (req, res) => {
//     try {
//         const productId = req.body.productId; // Extract productId from request body
//         const { name, category, subCategory, subSubCategory, price, additions } = req.body; // Extract other fields from request body

//         // Check if image is included in the request body
//         let imagePath;
//         if (req.file) {
//             imagePath = req.file.path;
//         }

//         // Update the product based on the provided fields
//         const updatedProduct = await Product.findOneAndUpdate(
//             { _id: productId },
//             {
//                 $set: {
//                     name: name,
//                     category: category,
//                     subCategory: subCategory,
//                     subSubCategory: subSubCategory,
//                     price: price,
//                     imagePath: imagePath // Assuming imagePath is the field where you store the image path in your database
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// //for delete
//  const deleteProductController = async (req, res) => {
//     try {

//         await Product.findOneAndDelete({_id: req.body.productId})
//         res.status(200).json("Product Deleted!");
//     } catch(error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// }

// const deleteproductForDayController = async (req, res) => {
//     try {
//         const date = new Date(req.params.date);
//         date.setHours(0, 0, 0, 0);
//         const endDate = new Date(date);
//         endDate.setHours(23, 59, 59, 999);

//         // Delete products created between start and end of the specified day
//         const deletedProduct = await Product.deleteMany({ createdAt: { $gte: date, $lte: endDate } });
//         if (deletedProduct.deletedCount === 0) {
//             return res.status(404).json({ message: "No Product found for the specified day" });
//         }
//         res.json({ message: "All Product for the day deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports={getProductController,addProductController,updateProductController,deleteProductController,deleteproductForDayController}




























const  Product = require ("../models/productModel.js");
const path = require('path')

//for add or fetch
 const getProductController = async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).send(products);

    } catch(error) {
        console.log(error);
    }
}
//get specific product
const ProductId=async (req, res) => {
    try {
      const productId = req.params.productId;
      // Find the product in the database by its ID
      const product = await Product.findById(productId);
      
      if (!product) {
        // If the product with the specified ID is not found, return a 404 response
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // If the product is found, return it in the response
      res.status(200).json(product);
    } catch (error) {
      // If an error occurs, return a 500 response with an error message
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
//for add
const addProductController = async (req, res) => {
    try {
        const { name, category, subCategory, subSubCategory, price , additions } = req.body;
        const image = req.file.path; // Corrected variable name
    
        const newProduct = new Product({
          name,
          category,
          subCategory,
          subSubCategory,
          price,
          additions,
          image // Corrected variable name
        });
    
        await newProduct.save();
        const imageUrl = `/uploads/${image}`; // Construct the image URL
        res.json({ success: true, message: "Product added successfully", imageUrl }); // Corrected variable name
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error uploading product" });
    }
}

//for update
const updateProductController =  async (req, res) => {
    try {
      const { productId, ...updateData } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
      res.send(updatedProduct);
    } catch (error) {
      res.status(400).send(error);
    }
  }
//for delete
 const deleteProductController = async (req, res) => {
    try {

        await Product.findOneAndDelete({_id: req.body.productId})
        res.status(200).json("Product Deleted!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

const deleteproductForDayController = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        date.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        // Delete products created between start and end of the specified day
        const deletedProduct = await Product.deleteMany({ createdAt: { $gte: date, $lte: endDate } });
        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: "No Product found for the specified day" });
        }
        res.json({ message: "All Product for the day deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={getProductController,addProductController,updateProductController,deleteProductController,deleteproductForDayController,ProductId}