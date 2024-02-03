const model = require("../models/questModel")



module.exports.questIdChecker = (req, res, next) => {
    const data = { quest_id: req.params.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        }
        else {
            if (results.length == 0) {
                res.status(404).json();
            }
            else {
                next()
            }
        }
    }
    model.questIdChecker(data, callback)
}

module.exports.completedCharacters = (req, res, next) => {
    const data = { quest_id: req.params.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        }
        else {
            if (results.length == 0) {
                res.status(404).json();
            }
            else {
                
                res.status(200).json(results)
            }
        }
    }
    model.completedCharacters(data, callback)
}

module.exports.showAllQuest = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:"Internal Server Error"})
        }
        else {
            res.status(200).json(results)
        }
    }
    model.showAllQuest(callback)
}

module.exports.showQuestById = (req, res, next) => {
    const data = { quest_id: req.params.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        }
        else {
            if (results.length == 0) {
                res.status(404).send(
                    "Quest is not found"
                );
            }
            else {
                res.status(200).json(results[0])
            }
        }
    }
    model.showQuestById(data, callback)
}

module.exports.checkQuestAndCharacterId = (req, res, next) => {
    if (!req.body.character_id || !req.body.quest_id) {
        res.status(400).json({message:"Character Id or Quest Id is missing."})
        return;
    }
    const data = { character_id: req.body.character_id, quest_id: req.body.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:"Internal server error"})
        }
        else {
            if (results[1].length == 0) {
                res.status(404).json({message:"Character is not found"})
            }
            else if (results[0].length == 0) {
                res.status(404).json({message:"Quest is not found"})
            }
            else if (results[0].length > 0 && results[1].length > 0) {
                next()
            }
        }
    }
    model.checkQuestAndCharacterId(data, callback)
}

module.exports.checkCharacterLevel = (req, res, next) => {
    const data = { character_id: req.body.character_id, quest_id: req.body.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:"Internal server error"})
            ;
        }
        else {
            if (results[0][0].level >= results[1][0].level_requirement) {
                next()
            }
            else {
                res.status(403).json({message:"Level of your character doesn't meet with the level requirement of this quest.",winOrLose:"lowlevel"})
            }
        }
    }
    model.checkCharacterLevel(data, callback);
}

module.exports.getDataForbattlefield = (req, res, next) => {
    const data = { character_id: req.body.character_id, quest_id: req.body.quest_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:"Internal server error"})
        }
        else {
            res.locals.characterHp = results[0][0].hp
            res.locals.characterDmg = results[0][0].dmg
            res.locals.enemyHp = results[1][0].creature_hp
            res.locals.enemyDmg = results[1][0].creature_dmg
            let hpA = res.locals.characterHp;
            const attackDamageA = res.locals.characterDmg;

            let hpB = res.locals.enemyHp;
            const attackDamageB = res.locals.enemyDmg;

            while (hpA > 0 && hpB > 0) {
                hpB -= attackDamageA;

                hpA -= attackDamageB;
                
            }

            if (hpA <= 0) {
                res.locals.creature_name=results[1][0].creature_name
                res.status(200).json({message:`
                The creature ${results[1][0].creature_name} has appeared!\n
                The battle between two of you started!\n
                ---------------------------------------\n
                You got defeated by ${results[1][0].creature_name}.\n
                YOU LOST.
                `,
                creature_name:res.locals.creature_name,
                winOrLose:"lose"
            })
            
                
            }
            else{
                res.locals.creature_name=results[1][0].creature_name
                res.locals.reward_itemId=results[1][0].reward_itemId
                res.locals.reward_item=results[1][0].reward_item
                res.locals.reward_gold=results[1][0].reward_gold
                res.locals.reward_level=results[1][0].reward_level
                next()
            }

        }
    }
    model.getDataForbattlefield(data, callback);
}

module.exports.addRewards = (req, res, next) => {
    const data = { character_id: req.body.character_id,quest_id: req.body.quest_id,item_id:res.locals.reward_itemId,gold: res.locals.reward_gold,level: res.locals.reward_level}
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:"Internal server error"})
        }
        else {
            
            res.status(200).json({message:`
            The creature ${res.locals.creature_name} has appeared!\n
            The battle between two of you started!\n
            ---------------------------------------\n
            You defeated the ${res.locals.creature_name}.\n
            🎉🎉YOU WIN🎉🎉
            You received ${res.locals.reward_gold} gold, Item: ${res.locals.reward_item}.
            Your character level was increased by ${ res.locals.reward_level}
            `,
            winOrLose:"win",
            creature_name:res.locals.creature_name,
            reward_gold:res.locals.reward_gold,
            reward_item:res.locals.reward_item,
            reward_level:res.locals.reward_level
            
        })
        }
    }
    model.addRewards(data,callback)
}