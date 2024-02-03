const express = require('express');
const router = express.Router();
const questController=require('../controllers/questController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");

//show a list of characters who completed this quest.
router.get('/:quest_id/completedCharacters',questController.questIdChecker,questController.completedCharacters);

//show details about a specific quest
router.get('/:quest_id',questController.showQuestById);

//show all quests
router.get("/",questController.showAllQuest);

//accept a quest.firstly check quest is already completed, if so u can't redo.if not check if the character level meets with the level requirement of this quest.
// then get hp and dmg of both character and enemy and calculate, then show the result (win or lose)
//if u won,u wil receive reward item, gold and some levels will be added to  ur character
router.post("/accept",jwtMiddleware.verifyToken,questController.checkQuestAndCharacterId,questController.checkCharacterLevel,questController.getDataForbattlefield,questController.addRewards); 
//quest Id and character Id must be in the request body.


module.exports=router;