const express=require('express')
const router=express.Router()
const taskProgressController= require('../controllers/taskProgressController')
router.post("/",taskProgressController.checkUserAndtask,taskProgressController.createTaskProgress);
router.get("/:progress_id",taskProgressController.selectByProgressId);
router.put("/:progress_id",taskProgressController.updateByProgressId);
router.delete("/:progress_id",taskProgressController.deleteByProgressId);
module.exports=router;