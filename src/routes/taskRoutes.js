const express=require('express')
const router=express.Router()
const taskController= require('../controllers/taskController')
router.post("/",taskController.createTask);
router.get("/:task_id",taskController.readByID);
router.get("/",taskController.readAll);
router.put("/:task_id",taskController.updateByID);
router.delete("/:task_id",taskController.deleteByID);
module.exports=router;