const express=require('express')
const router=express.Router()
const userController= require('../controllers/userController')
router.post("/",userController.checkAlreadyExist,userController.createNewUser);
router.get("/:user_id",userController.readUserByID);
router.get("/",userController.readAllUser);
router.put("/:user_id",userController.checkAlreadyExist,userController.updateByID);
router.delete("/:user_id",userController.deleteByID);
module.exports=router;