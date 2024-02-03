const express = require('express');
const router = express.Router();
const characterController=require('../controllers/characterController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");

//show a list of characters ranked by level
router.get("/rank",characterController.rankCharacterByLevel)

//show a list of quest that a character has completed
router.get("/:character_id/quest",characterController.showQuestByCharacterId)

//show details about a character
router.get("/:character_id",characterController.getCharacterById);

//show all items that a character has(both equipped ones and unequppied)
router.get("/:character_id/inventory",jwtMiddleware.verifyToken,characterController.character_idChecker,characterController.showInventory);

//show only equipped items
router.get('/:character_id/showEquippedItems',jwtMiddleware.verifyToken,characterController.character_idChecker,characterController.showEquippedItems);

//equip an item. first check if the item is in inventory then check if it's not already equipped, finally equip that item
router.post('/:character_id/equipItem',jwtMiddleware.verifyToken,characterController.character_idChecker,characterController.checkItemInInventory,characterController.checkAlreadyEquipped,characterController.equipItem);

//edit character name
router.put("/:character_id/name",jwtMiddleware.verifyToken,characterController.checkNameAlrExist,characterController.updateCharacterName);

//unequip an item, remove the stats of that item
router.delete('/:character_id/unequipItem',jwtMiddleware.verifyToken,characterController.character_idChecker,characterController.unequipItem,characterController.removeItemStatus);

module.exports = router;
