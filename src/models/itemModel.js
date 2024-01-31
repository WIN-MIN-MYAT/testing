const pool=require('../services/db');

module.exports.showAllItems=(callback)=>{
    const SQLSTATEMENT=`SELECT item_id, item_name AS 'item name', item_type,rarity FROM Item;
    `
    pool.query(SQLSTATEMENT,callback)
}

module.exports.showById=(data,callback)=>{
    const SQLSTATEMENT=`SELECT item_name AS 'item name', item_type,rarity,description,special_effect_ability AS 'special_ability',special_effect_health AS 'hp++',special_effect_attackDmg AS "attack damage++" FROM Item
    WHERE item_id=?;
    `
    const VALUES=[data.item_id]
    pool.query(SQLSTATEMENT,VALUES,callback)

}