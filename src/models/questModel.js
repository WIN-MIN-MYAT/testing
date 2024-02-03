const pool = require('../services/db');

module.exports.questIdChecker=(data,callback)=>{
    const SQLSTATMENT = `
        SELECT quest_id FROM Quest
        WHERE quest_id = ?;
    `;
    const VALUES=[data.quest_id];
    pool.query(SQLSTATMENT,VALUES,callback);
}

module.exports.completedCharacters=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT DISTINCT Character_progression.character_name, MAX(Quest_completed.completed_on) AS completed_on
    FROM Character_progression
    INNER JOIN Quest_completed ON Character_progression.character_id=Quest_completed.character_id 
    WHERE Quest_completed.quest_id=?
    GROUP BY Character_progression.character_id,Character_progression.character_name,Quest_completed.quest_id
    ORDER BY completed_on;
    `
    const  VALUES=[data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}


module.exports.showAllQuest=(callback)=>{
    const SQLSTATEMENT=`SELECT quest_id, title , description, CONCAT('[ Level:', reward_level, ', Item:', reward_item,', Gold: ',reward_gold, ']') AS 'rewards', difficulty,level_requirement FROM Quest;
    `
    pool.query(SQLSTATEMENT,callback)

}

module.exports.showQuestById=(data,callback)=>{
    const SQLSTATEMENT=`SELECT title, description, reward_level,  reward_item,reward_gold, difficulty,level_requirement, creature_name,creature_hp,creature_dmg FROM Quest 
    WHERE quest_id=?;`
    const VALUES=[data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.checkQuestAndCharacterId=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT quest_id FROM Quest
    WHERE quest_id = ?;
    SELECT character_id FROM Character_progression
    WHERE character_id = ?;
    `
    const VALUES=[data.quest_id,data.character_id]
    pool.query(SQLSTATEMENT,VALUES,callback)

}

module.exports.checkAlrCompleted=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM Quest_completed WHERE character_id=? AND quest_id=?;`
    const VALUES=[data.character_id,data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)

}

module.exports.checkCharacterLevel=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT level FROM Character_progression WHERE character_id=?;
    SELECT level_requirement FROM Quest WHERE quest_id=?;
    `;
    const VALUES=[data.character_id,data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)

}

module.exports.getDataForbattlefield=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT hp,dmg FROM Character_progression WHERE character_id=?;
    SELECT * FROM Quest WHERE quest_id=?;
    `;
    const VALUES=[data.character_id,data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.addRewards=(data,callback)=>{
    const SQLSTATEMENT=`
    UPDATE Character_progression SET level=level+?,gold=gold+? WHERE character_id=?;
    INSERT INTO Inventory (character_id,item_id,received_on) VALUES(?,?,CURRENT_TIMESTAMP);
    INSERT INTO Quest_completed (character_id,quest_id,completed_on) VALUES(?,?,CURRENT_TIMESTAMP)
    `
    const VALUES=[data.level,data.gold,data.character_id,data.character_id,data.item_id,data.character_id,data.quest_id]
    pool.query(SQLSTATEMENT,VALUES,callback)

}