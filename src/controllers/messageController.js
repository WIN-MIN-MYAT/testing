const model = require("../models/messageModel")

//create new message
module.exports.createMessage = (req, res, next) => {
    if(req.body.message == undefined || req.body.message == "")
    {
        res.status(400).json({message:"Error: message text is undefined"})
        return;
    }
    else if(req.body.character_id == undefined)
    {
        res.status(400).json({message:"Error: character_id is undefined"});
        return;
    }

    const data = {
        character_id: req.body.character_id,
        message: req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

module.exports.updateMessageById = (req, res, next) => {
    if(req.params.message_id == undefined)
    {
        res.status(400).json({message:"Error: message_id is undefined"});
        return;
    }
    else if(req.body.message == undefined || req.body.message == "")
    {
        res.status(400).json({message:"Error: message is undefined or empty"});
        return;
    }
    const data = {
        message_id: req.params.message_id,
        message: req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteById(data, callback);
}
