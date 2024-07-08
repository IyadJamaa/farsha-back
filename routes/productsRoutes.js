// const express =require('express') ;

// const multer  = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Relative path
//     },
//     filename: function (req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, Date.now() + ext);
//     }
// });


  
//   const upload = multer({ storage: storage });
// const productController= require ("../controllers/productController");

// const productRouter = express.Router();

// productRouter.get("/getproducts", productController.getProductController);

// productRouter.post("/addproducts",upload.single('image'), productController.addProductController);

// productRouter.put("/updateproducts", productController.updateProductController);

// productRouter.post("/deleteproducts",productController. deleteProductController);
// productRouter.delete("/deleteproductforday/:date", productController.deleteproductForDayController);
// module.exports=productRouter

















const express =require('express') ;

const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Relative path
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    }
});


  
  const upload = multer({ storage: storage });
const productController= require ("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/getproducts", productController.getProductController);
productRouter.get("/getproducts/:id", productController.ProductId);


productRouter.post("/addproducts",upload.single('image'), productController.addProductController);

productRouter.put('/updateproduct', upload.single('image'), productController.updateProductController);
//productRouter.put("/updateProduct/:productId", productController.updateProductController);
productRouter.post("/deleteproducts",productController. deleteProductController);
productRouter.delete("/deleteproductforday/:date", productController.deleteproductForDayController);
module.exports=productRouter