const model = require('../models/taskProgressModel')
module.exports.checkUserAndtask = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).end("Missing data.");
        return
    }
    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error);
        else {
            let userIdExist = false;
            for (i of results[0]) {
                if (i.user_id == req.body.user_id) {
                    userIdExist = true;
                    break;
                }
            }
            let taskIdExist = false;
            for (i of results[1]) {
                if (i.task_id == req.body.task_id) {
                    taskIdExist = true;
                    break;

                }
            }
            if (userIdExist && taskIdExist) {
                next()
            }
            else {
                res.status(404).end("User or task is not found.")
            }
        }
    }
    model.checkUserAndtask(callback)
}

module.exports.createTaskProgress = (req, res, next) => {

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }
    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error);
        else {
            res.status(201).json({
                progress_id: results.insertId,
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                completion_date: req.body.completion_date,
                notes: req.body.notes
            })
        }
    }
    model.createTaskProgress(data, callback);
};

module.exports.selectByProgressId=(req,res,next)=>{
    const data={progress_id:req.params.progress_id}
    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error);
        else{
            if(results.length==0){
                res.status(404).end("No task progress is found.")
            }else{
                res.status(200).json(results[0])
            }
        }
    }
    model.selectByProgressId(data,callback)
}

module.exports.updateByProgressId=(req,res,next)=>{
    if(req.body.notes==undefined){
        res.status(400).json({message:"Note is missing"})
        return;
    }
    const data={
        notes: req.body.notes,progress_id:req.params.progress_id
    }
    const callback=(error,results,fields)=>{
        if (error) res.status(500).json(error);
        else{
            if(results[1].affectedRows==0){
                res.status(404).end();
            }else{
                res.status(200).json({
                    progress_id:results[0][0].progress_id,
                    user_id: results[0][0].user_id,
                    task_id: results[0][0].task_id,
                    completion_date: results[0][0].completion_date,
                    notes: req.body.notes
                });
            }
        }

    }
    model.updateByProgressId(data,callback)
}

module.exports.deleteByProgressId=(req,res,next)=>{
    const data={progress_id:req.params.progress_id}
    const callback=(error,results,fields)=>{
        if (error) res.status(500).json(error);
        else{
            if(results[0].affectedRows==0){
                res.status(404).end();
            }
            else{
                res.status(204).end()
            }
        }
    }
    model.deleteByProgressId(data,callback);
}
