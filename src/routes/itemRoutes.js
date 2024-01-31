const express = require('express');
const router = express.Router();
const itemController=require('../controllers/itemController');
router.get('/',itemController.showAllItems); //show all items
router.get('/:item_id',itemController.showById); // show details about a specific item
module.exports=router;