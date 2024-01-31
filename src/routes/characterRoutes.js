const express = require('express');
const router = express.Router();
const characterController=require('../controllers/characterController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");


router.get("/rank",characterController.rankCharacterByLevel)

//show a list of quest that a character has completed
router.get("/:character_id/quest",characterController.showQuestByCharacterId)

//show details about a character
router.get("/:character_id",characterController.getCharacterById);

//show all items that a character has(both equipped ones and unequppied)
router.get("/:character_id/inventory",characterController.character_idChecker,characterController.showInventory);

//show only equipped items
router.get('/:character_id/showEquippedItems',characterController.character_idChecker,characterController.showEquippedItems);

//equip an item. first check if the item is in inventory then check if it's not already equipped, finally equip that item
router.post('/:character_id/equipItem',characterController.character_idChecker,characterController.checkItemInInventory,characterController.checkAlreadyEquipped,characterController.equipItem);

//firstly,validate the userId and points of that user, if that user hasn't done any task in sectionA,he can't play this RPG
//create a new character, then add starter items to newly created character's inventory,
//equip those items and add stats of that item to character
router.post("/",characterController.checkuserIdAndPoints,characterController.createNewCharacter,characterController.addItemsToNewCharacter,characterController.addStatsToNewCharacter);

//edit character name

router.put("/:character_id/name",jwtMiddleware.verifyToken,characterController.checkNameAlrExist,characterController.updateCharacterName);

//unequip an item, remove the stats of that item
router.delete('/:character_id/unequipItem',characterController.character_idChecker,characterController.unequipItem,characterController.removeItemStatus);

module.exports = router;
