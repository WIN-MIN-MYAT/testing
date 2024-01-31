const model = require("../models/taskModel");

module.exports.createTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description==undefined || req.body.points==undefined) {
        res.status(400).end();    
        return
    }
    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error);
        else {
            res.status(201).json({
                task_id: results.insertId,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            })
        }
    }
    model.createTask(data, callback);
};

module.exports.readAll = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    model.readAll(callback);
};

module.exports.readByID = (req, res, next) => {
    const data = { task_id: req.params.task_id };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).end(    );
        } else {
            if (results.length == 0) {
                res.status(404).end()
            } else {
                res.status(200).json(results[0])
            }
        }
    }
    model.readByID(data, callback);
}

module.exports.updateByID = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).send("Title or Description or Points is missing");
        return
    }
    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error)
        } else {
            if (results.affectedRows == 0) {
                res.status(404).send()
            } else {
                res.status(200).json({
                    task_id: req.params.task_id,
                    title: req.body.title,
                    description: req.body.description,
                    points: req.body.points
                })
            }
        }
    }
    model.updateByID(data,callback);
}

module.exports.deleteByID=(req,res,next)=>{
    const data={task_id:req.params.task_id};
    const callback=(error,results,fields)=>{
        if(error){
            res.status(500).json(error);
        }else{
            if(results[0].affectedRows==0){
                res.status(404).send()
            }else{
                res.status(204).send()
            }
        }
    }
    model.deleteByID(data,callback);
}