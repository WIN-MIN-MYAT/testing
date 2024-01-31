const pool=require('../services/db');

module.exports.checkUserAndtask=(callback)=>{
    const SQLSTATEMENT=`
    SELECT user_id FROM User;
    SELECT task_id FROM Task;
    `
    pool.query(SQLSTATEMENT,callback)
}

module.exports.createTaskProgress=(data,callback)=>{
    const SQLSTATEMENT=`
    INSERT INTO TaskProgress (user_id,task_id,completion_date,notes) VALUES(?,?,?,?);
    
    `
    const VALUES=[data.user_id,data.task_id,data.completion_date,data.notes]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.selectByProgressId=(data,callback)=>{
    const SQLSTATEMENT=`SELECT *, DATE(completion_date) AS completion_date FROM TaskProgress WHERE progress_id=?;`;
    const VALUE=[data.progress_id];
    pool.query(SQLSTATEMENT,VALUE,callback)
}

module.exports.updateByProgressId=(data,callback)=>{
    const SQLSTATEMENT=`
    SELECT *,DATE(completion_date) AS completion_date FROM TaskProgress WHERE progress_id=?;
    UPDATE TaskProgress SET notes=? WHERE progress_id=?;
    `
    const VALUES=[data.progress_id,data.notes,data.progress_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.deleteByProgressId=(data,callback)=>{
    const SQLSTATEMENT=`
    DELETE FROM TaskProgress WHERE progress_id=?;
    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `
    const VALUE=[data.progress_id]
    pool.query(SQLSTATEMENT,VALUE,callback)

}