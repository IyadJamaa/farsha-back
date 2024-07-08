const express =require('express') ;

const userController = require ("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/login", userController.loginController);

userRouter.post("/register", userController.registerController);

module.exports=userRouter