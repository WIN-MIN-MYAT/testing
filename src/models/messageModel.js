const pool=require('../services/db');

module.exports.selectAll=(callback)=>{
    const SQLSTATEMENT=`
    SELECT Character_progression.character_name,Character_progression.character_id,Message.message,Message.created_on,Message.message_id
    FROM Message
    INNER JOIN Character_progression ON Character_progression.character_id=Message.character_id;
    `
    pool.query(SQLSTATEMENT,callback)
}

module.exports.updateById=(data,callback)=>{
    const SQLSTATMENT = `
    UPDATE Message
    SET message = ?
    WHERE message_id = ?;
    `;
    const VALUES = [data.message, data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Message (message, character_id,created_on)
    VALUES (?, ?,CURRENT_TIMESTAMP);
    `;
    const VALUES = [data.message, data.character_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Message 
    WHERE message_id = ?;
    `;
    const VALUES = [data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
