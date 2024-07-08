const express =require('express') ;

const billsController  = require("../controllers/billsController.js");

const billsRouter = express.Router();
billsRouter.post("/addbills", billsController.addBillsController);
billsRouter.put("/updatebills/:id", billsController.updateBillController);

billsRouter.get("/getbills", billsController.getBillsController);
billsRouter.delete("/deletebill/:id", billsController.deleteBillController);
billsRouter.delete("/deletebillsforday/:date", billsController.deleteBillsForDayController);
billsRouter.get('/:id/products',billsController.addproductbills)
module.exports=billsRouter
