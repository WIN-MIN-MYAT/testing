const pool=require("../services/db")

module.exports.createTask=(data,callback)=>{
    const SQLSTATEMENT=`INSERT INTO Task (title,description,points) VALUES(?,?,?);`
    const VALUES=[data.title,data.description,data.points];
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.readAll=(callback)=>{
    const SQLSTATEMENT=`SELECT * FROM Task;`;
    pool.query(SQLSTATEMENT,callback);
}

module.exports.readByID=(data,callback)=>{
    const SQLSTATEMENT=`SELECT * FROM Task WHERE task_id=?;`;
    const VALUES=[data.task_id];
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.updateByID=(data,callback)=>{
    const SQLSTATEMENT=`UPDATE Task SET title=?, description=?, points=? WHERE task_id=?;`;
    const VALUES=[data.title,data.description,data.points,data.task_id]
    pool.query(SQLSTATEMENT,VALUES,callback);
}

module.exports.deleteByID=(data,callback)=>{
    const SQLSTATEMENT=`DELETE FROM Task WHERE task_id=?;
    ALTER TABLE Task AUTO_INCREMENT = 1;`;
    const VALUES=[data.task_id];
    pool.query(SQLSTATEMENT,VALUES,callback)
}