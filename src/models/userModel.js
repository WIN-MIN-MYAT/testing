const pool=require('../services/db');

module.exports.registerModel = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO User (username,email,password)
    VALUES (?,?,?);
    `;
    const VALUES = [data.username, data.email, data.hashed_pw];
    pool.query(SQLSTATMENT, VALUES, callback);
};

module.exports.loginModel = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User WHERE username=?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.insertSingle=(data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO User (username,email) VALUES(?,?);
    `;
    const VALUE=[data.username,data.email];
    pool.query(SQLSTATEMENT,VALUE,callback)
};

module.exports.selectAll=(callback)=>{
    const SQLSTATEMENT=`SELECT * FROM User;`
    pool.query(SQLSTATEMENT,callback);
}

module.exports.selectByID=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT * FROM User WHERE user_id=?;
    SELECT SUM(Task.points) AS total_points
    FROM Task
    INNER JOIN TaskProgress ON TaskProgress.task_id=Task.task_id
    WHERE TaskProgress.user_id=?
    `;
    const VALUE=[data.user_id,data.user_id];
    pool.query(SQLSTATEMENT,VALUE,callback);
}

module.exports.updateByID=(data,callback)=>{
    const SQLSTATEMENT=`UPDATE User SET username=?, email=? WHERE user_id=?`
    const VALUE=[data.username,data.email,data.user_id];
    pool.query(SQLSTATEMENT,VALUE,callback);
}

module.exports.deleteByID=(data,callback)=>{
    const SQLSTATEMENT=`DELETE FROM User WHERE user_id=?;
    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUE=[data.user_id];
    pool.query(SQLSTATEMENT,VALUE,callback);
}

module.exports.checkAlreadyExist=(callback)=>{
    const SQLSTATEMENT=`
    SELECT email,username FROM User;
    `;
    pool.query(SQLSTATEMENT,callback)
}