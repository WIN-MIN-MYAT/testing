const model = require('../models/userModel')

module.exports.register = (req, res, next) => {
    if (!req.body.password) {
        res.status(404).json({message:'Password is not defined.'})
        return;
    }

    const data = {
        hashed_pw: res.locals.hash,
        username: req.body.username,
        email: req.body.email,
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.user_id = results.insertId;
            next();
        }
    }
    model.registerModel(data, callback);
};

module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(404).json({message:"Username or password is not provided in the request body."})
    }
    const data = {
        username: req.body.username,
        password: req.body.password,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.locals.userId = results[0].id;
            res.locals.hash = results[0].password;
            next();
        }
    }
    model.loginModel(data, callback);
};

module.exports.checkAlreadyExist = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).send("Username or Email is missing!");
        return;
    }
    
    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error)
        else {
            for(i of results){
                if(req.body.email==i.email){
                    res.status(409).json({message:"Email is already associated with another user"})
                    return;
                }
                else if(req.body.username==i.username){
                    res.status(409).json({message:"Username is already associated with another user"})
                    return;
                }
            }
            next();
        }
    }
    model.checkAlreadyExist(callback);
}
module.exports.createNewUser = (req, res, next) => {

    const data = { username: req.body.username, email: req.body.email }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(201).json({
                user_id: results.insertId,
                username: req.body.username,
                email: req.body.email
            })
        }
    }
    model.insertSingle(data, callback);
}
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if(results.length==0) res.status(404).end()
            else{
                console.log(results)
                res.status(200).json(results);
            }
        }
    }
    model.selectAll(callback);
}
module.exports.readUserByID = (req, res, next) => {
    const data = { user_id: req.params.user_id };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results[0].length == 0) {
                res.sendStatus(404);
            } else {
                results[1][0].total_points=parseInt(results[1][0].total_points)
                res.status(200).json({...results[0][0],...results[1][0]});
            }
        }
    }
    model.selectByID(data, callback)
}

module.exports.updateByID = (req, res, next) => {
    const data={user_id: req.params.user_id,username: req.body.username,email: req.body.email}
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (results.affectedRows == 0) {
                res.status(404).send("User not found")
            }
            else res.status(200).json({
                user_id: parseInt(req.params.user_id),
                username: req.body.username,
                email: req.body.email
            })
        }
    }
    model.updateByID(data, callback);
}

module.exports.deleteByID = (req, res, next) => {
    const data = { user_id: req.params.user_id }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }
    model.deleteByID(data, callback);
}