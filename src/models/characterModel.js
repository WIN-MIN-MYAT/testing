const pool = require('../services/db');

module.exports.checkAlreadyExist=(callback)=>{
    const SQLSTATEMENT=`
    SELECT email,character_name FROM Character_progression;
    `;
    pool.query(SQLSTATEMENT,callback)
}

module.exports. registerModel = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Character_progression (character_name,email,password)
    VALUES (?,?,?);
    `;
    const VALUES = [data.character_name, data.email, data.hashed_pw];
    pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.loginModel = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Character_progression WHERE character_name=?;
    `;
    const VALUES = [data.character_name];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.rankCharacterByLevel=(callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM Character_progression
    ORDER BY level DESC;
    `
    pool.query(SQLSTATEMENT,callback)
}

module.exports.showQuestByCharacterId=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT Quest.title,Quest.difficulty,Quest_completed.completed_on
    FROM Quest_completed
    INNER JOIN Quest ON Quest_completed.quest_id=Quest.quest_id 
    WHERE Quest_completed.character_id=?;
    `
    const  VALUES=[data.character_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.character_idChecker=(data,callback)=>{
    const SQLSTATMENT = `
        SELECT character_id FROM Character_progression
        WHERE character_id = ?;
    `;
    const VALUES=[data.character_id];
    pool.query(SQLSTATMENT,VALUES,callback);
}

module.exports. getCharacterById=(data,callback)=>{
    const SQLSTATMENT = `
        SELECT * FROM Character_progression
        WHERE character_id = ?;
    `;
    const VALUES=[data.character_id];
    pool.query(SQLSTATMENT,VALUES,callback);
}

module.exports.showEquippedItems=(data,callback)=>{
    const SQLSTATMENT = `
    SELECT Item.item_name
    FROM Equipped_item
    INNER JOIN Item ON Equipped_item.item_id = Item.item_id
    WHERE Equipped_item.character_id = ?;
    `;
    const VALUES=[data.character_id];
    pool.query(SQLSTATMENT,VALUES,callback);
}

module.exports.showInventory=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT Item.*
    FROM Inventory
    INNER JOIN Item ON Inventory.item_id = Item.item_id
    WHERE Inventory.character_id = ?;
    `
    const VALUES=[data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.checkuserIdAndPoints=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM User where user_id=?;
    SELECT SUM(Task.points) AS total_points
    FROM Task
    INNER JOIN TaskProgress ON TaskProgress.task_id=Task.task_id
    WHERE TaskProgress.user_id=?;
    `
    const VALUES=[data.user_id,data.user_id];
    pool.query(SQLSTATEMENT,VALUES,callback);

}

module.exports.createNewCharacter=(data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Character_progression (character_name,created_on,email,password) VALUES(?,CURRENT_TIMESTAMP,?,?);
    `;
    const VALUES=[data.character_name,data.email,data.hashed_pw];
    pool.query(SQLSTATEMENT,VALUES,callback);

}

module.exports.addItemsToNewCharacter=(data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Inventory (character_id,item_id,received_on) VALUES(?,1,CURRENT_TIMESTAMP);
    INSERT INTO Equipped_item (character_id,item_id) VALUES(?,1);
    SELECT special_effect_attackDmg FROM Item WHERE item_id=1;
    SELECT special_effect_health FROM Item WHERE item_id=1;
    `;
    const VALUES=[data.character_id,data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.addStatsToNewCharacter=(data,callback)=>{
    const SQLSTATEMENT=`
    UPDATE Character_progression SET dmg=dmg+?, hp=hp+? WHERE character_id=?;
    `
    const VALUES=[data.attkdmg,data.health,data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);

}

module.exports.checkNameAlrExist=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM Character_progression WHERE character_name=? AND character_id <> ? ;`
    const VALUES=[data.character_name,data.character_id]
    pool.query(SQLSTATEMENT,VALUES,callback);

}

module.exports.updateCharacterName=(data,callback)=>{
    const SQLSTATEMENT=`
    UPDATE Character_progression SET character_name=? WHERE character_id=?;
    `;
    const VALUES=[data.character_name,data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.checkItemInInventory=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT item_id FROM Inventory WHERE character_id=?;
    `
    const VALUES=[data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.checkAlreadyEquipped=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT item_id FROM Equipped_item WHERE character_id=?;
    SELECT item_name FROM Item WHERE item_id=?;
    SELECT special_effect_attackDmg FROM Item WHERE item_id=?;
    SELECT special_effect_health FROM Item WHERE item_id=?;
    `
    const VALUES=[data.character_id,data.item_id,data.item_id,data.item_id];
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.equipItem=(data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO Equipped_item (character_id,item_id) VALUES(?,?);
    SELECT item_name FROM Item WHERE item_id=?;
    UPDATE Character_progression SET dmg=(dmg+?), hp=(hp+?) WHERE character_id=?;
    `
    const VALUES=[data.character_id,data.item_id,data.item_id,data.newItemDmg,data.newItemHealth,data.character_id];
    pool.query(SQLSTATEMENT,VALUES,callback);

}

module.exports.unequipItem=(data,callback)=>{
    const SQLSTATEMENT=`
    DELETE FROM Equipped_item 
    WHERE character_id = ? AND item_id=?;
    ALTER TABLE Equipped_item  AUTO_INCREMENT = 1;
    SELECT special_effect_attackDmg FROM Item WHERE item_id=?;
    SELECT special_effect_health FROM Item WHERE item_id=?;
    `;
    const VALUES=[data.character_id,data.item_id,data.item_id,data.item_id];
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.removeItemStatus=(data,callback)=>{
    const SQLSTATEMENT=`
    UPDATE Character_progression SET dmg=(dmg-?), hp=(hp-?) WHERE character_id=?;
    SELECT item_name FROM Item WHERE item_id=?;
    `
    const VALUES=[data.removeItemDmg,data.removeItemHealth,data.character_id,data.item_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}