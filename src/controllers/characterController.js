const model = require('../models/characterModel');

module.exports.rankCharacterByLevel = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.length == 0) res.status(404).end()
            else {
                res.status(200).json(results);
            }
        }
    }
    model.rankCharacterByLevel(callback)
}

module.exports.showQuestByCharacterId = (req, res, next) => {
    const data = { character_id: req.params.character_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
        else {
            if (results.length == 0) {
                res.status(404).json({ message: "Quest is not found" })
            }
            else {
                res.status(200).json(results)
            }
        }
    }
    model.showQuestByCharacterId(data, callback)
}

module.exports.character_idChecker = (req, res, next) => {
    const data = { character_id: req.params.character_id };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results.length == 0) {
                res.status(404).send(
                    "Character is not found"
                );
            }
            else next();
        }
    }
    model.character_idChecker(data, callback);
}

module.exports.getCharacterById = (req, res, next) => {
    const data = { character_id: req.params.character_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error" })
        } else {
            if (results.length == 0) {
                res.status(404).json({ message: "Character is not found" })
            }
            else res.status(200).json(results[0])
        }
    }
    model.getCharacterById(data, callback);
}

module.exports.showEquippedItems = (req, res, next) => {
    const data = { character_id: req.params.character_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results.length == 0) {
                res.status(404).send(
                    "No equipped item found!"
                );
            }
            else {
                let nameList = [];
                let text = "Your Equipped Items:\n";
                for (x of results) {
                    nameList.push(x.item_name)
                }
                for (let x = 0; x < nameList.length; x++) {
                    text += `${x + 1}. ${nameList[x]}\n`
                }
                res.status(200).send(text)
            };
        }
    }
    model.showEquippedItems(data, callback)
}

module.exports.showInventory = (req, res, next) => {
    const data = { character_id: req.params.character_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results.length == 0) {
                res.status(404).send(
                    "No item is found in your inventory"
                );
            }
            else {
                let nameList = [];
                let rarityList = [];
                let descriptionList = [];
                let abilityList = [];
                let idList = [];
                let text = "Your Inventory:\n";
                for (x of results) {
                    nameList.push(x.item_name)
                    rarityList.push(x.rarity)
                    descriptionList.push(x.description)
                    idList.push(x.item_id)
                    if (x.special_effect_ability == null) { abilityList.push("-") }
                    else abilityList.push(x.special_effect_ability)
                }
                for (let x = 0; x < nameList.length; x++) {
                    text += `${x + 1}. ${nameList[x]} (${rarityList[x]}): ${descriptionList[x]}\nSpecial effect the item offer: ${abilityList[x]}\n Item Id- ${idList[x]}\n\n`
                }
                res.status(200).send(text)
            };
        }
    }
    model.showInventory(data, callback)
}

module.exports.showCompletedQuest = (req, res, next) => {
    const data = { character_id: req.params.character_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results.length == 0) {
                res.status(404).send("\"There's no quest you have completed\""
                );
            }
            else {
                let nameList = [];
                let lvlList = [];
                let goldList = [];
                let itemList = [];
                let text = "The Quest You Have Completed:\n";
                for (x of results) {
                    nameList.push(x.title)
                    lvlList.push(x.reward_level)
                    goldList.push(x.reward_gold)
                    itemList.push(x.reward_item)
                }
                for (let x = 0; x < nameList.length; x++) {
                    text += `(${x + 1})\n Title: ${nameList[x]}\nRewards obtained: {Level: ${lvlList[x]}, Gold: ${goldList[x]}, Item: ${itemList[x]}}\n\n`
                }
                res.status(200).send(text)
            }
        }
    }
    model.showCompletedQuest(data, callback)
}
module.exports.checkuserIdAndPoints = (req, res, next) => {
    if (!req.body.character_name || !req.body.user_id) {
        res.status(400).send(
            "Missing character name or User Id"
        );
        return;
    }
    const data = { character_name: req.body.character_name, user_id: req.body.user_id };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results[0].length == 0) {
                res.status(404).send("User Id not found")
            }
            else if (!results[1][0].total_points) {
                res.status(403).send("User has only zero point so you can't participate in this RPG!\n Do at least one task to earn points and enjoy this RPG ")

            }
            else {
                next()
            }

        }
    }
    model.checkuserIdAndPoints(data, callback)
}

module.exports.login = (req, res, next) => {
    if (!req.body.character_name || !req.body.password) {
        res.status(404).json({ message: "Character name or password is not provided." })
    }
    const data = {
        character_name: req.body.character_name,
        password: req.body.password,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({ message: 'Character is not found' });
        } else {
            res.locals.character_id = results[0].character_id;
            res.locals.hash = results[0].password;
            next();
        }
    }
    model.loginModel(data, callback);
};

module.exports.checkAlreadyExist = (req, res, next) => {
    if (req.body.character_name == undefined || req.body.email == undefined) {
        res.status(400).send("Character Name or Email is missing!");
        return;
    }

    const callback = (error, results, fields) => {
        if (error) res.status(500).json(error)
        else {
            for (i of results) {
                if (req.body.email == i.email) {
                    res.status(409).json({ message: "Email is already associated with another user" })
                    return;
                }
                else if (req.body.character_name == i.character_name) {
                    res.status(409).json({ message: "Character name is already associated with another user" })
                    return;
                }
            }
            next();
        }
    }
    model.checkAlreadyExist(callback);

}
module.exports.createNewCharacter = (req, res, next) => {

    const data = {
        hashed_pw: res.locals.hash,
        character_name: req.body.character_name,
        email: req.body.email
    };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error" })
        } else {
            res.locals.newCharacterId = results.insertId
            next()
        }
    }
    model.createNewCharacter(data, callback)
}

module.exports.addItemsToNewCharacter = (req, res, next) => {
    const data = { character_id: res.locals.newCharacterId };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error" })
        } else {
            if (!results[2][0].special_effect_attackDmg) {
                res.locals.attkdmg = 0
            }
            else {
                res.locals.attkdmg = results[2][0].special_effect_attackDmg;
            }
            if (!results[3][0].special_effect_health) {
                res.locals.health = 0
            }
            else {
                res.locals.health = results[3][0].special_effect_health;
            }

            next();
        }
    }
    model.addItemsToNewCharacter(data, callback)
}

module.exports.addStatsToNewCharacter = (req, res, next) => {
    const data = { attkdmg: res.locals.attkdmg, health: res.locals.health, character_id: res.locals.newCharacterId };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error" })
        } else {
            next();
        }
    }
    model.addStatsToNewCharacter(data, callback)
}

module.exports.register = (req, res, next) => {
    if (!req.body.password) {
        res.status(404).json({ message: 'Password is not defined.' })
        return;
    }

    const data = {
        hashed_pw: res.locals.hash,
        character_name: req.body.character_name,
        email: req.body.email,
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.character_id = results.insertId;
            next();
        }
    }
    model.registerModel(data, callback);
};

module.exports.checkNameAlrExist = (req, res, next) => {
    if (!req.body.character_name) {
        res.status(400).json({ message: "Missing character name." })
        return;
    }
    const data = {
        character_name: req.body.character_name,
        character_id: req.params.character_id
    };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error" })
        } else {
            if (results.length == 0) {
                next()
            }
            else {
                res.status(409).json({ message: "Character Name must be unique." })
            }
        }
    }
    model.checkNameAlrExist(data, callback)
}

module.exports.updateCharacterName = (req, res, next) => {
    const data = {
        character_name: req.body.character_name,
        character_id: req.params.character_id
    };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: "Internal server error" })
        } else {
            res.status(201).json({ message: "Character Name updatted successfully." })
        }
    }
    model.updateCharacterName(data, callback);
}

module.exports.checkItemInInventory = (req, res, next) => {
    if (!req.body.item_id) {
        res.status(400).send(
            "Item Id is missing."
        );
        return;
    }
    const data = { character_id: req.params.character_id };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            let itemInInventory = false;
            for (x of results) {
                if (x.item_id == req.body.item_id) {
                    itemInInventory = true;
                    break;
                }
            }
            if (itemInInventory) { next(); }
            else {
                res.status(404).send("Item Id is invalid or You don't have that item.")
            }
        }
    }
    model.checkItemInInventory(data, callback)
}

module.exports.checkAlreadyEquipped = (req, res, next) => {
    const data = { character_id: req.params.character_id, item_id: req.body.item_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            let itemAlrEquipped = false;
            for (x of results[0]) {
                if (x.item_id == req.body.item_id) {
                    itemAlrEquipped = true;
                    break;
                }
            }
            if (itemAlrEquipped) {
                res.status(400).send(`
                Item: ${results[1][0].item_name} is already equipped.
                `)
            }
            else {

                if (!results[2][0].special_effect_attackDmg) {
                    res.locals.newItemDmg = 0
                }
                else {
                    res.locals.newItemDmg = results[2][0].special_effect_attackDmg;
                }
                if (!results[3][0].special_effect_health) {
                    res.locals.newItemHealth = 0
                }
                else {
                    res.locals.newItemHealth = results[3][0].special_effect_health;
                }

                next();
            }
        }
    }
    model.checkAlreadyEquipped(data, callback)
}

module.exports.equipItem = (req, res, next) => {
    const data = { item_id: req.body.item_id, character_id: req.params.character_id, newItemDmg: res.locals.newItemDmg, newItemHealth: res.locals.newItemHealth };
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            if (results.affectedRows == 0) {
                res.status(404).send(
                    "Item Id is invaild"
                );
            }
            else res.status(200).send(`
            Item: ${results[1][0].item_name} is successfully equipped.
            `)
        }
    }
    model.equipItem(data, callback);
}

module.exports.unequipItem = (req, res, next) => {
    if (!req.body.item_id) {
        res.status(400).send(
            "Item Id is missing."
        );
        return;
    }
    const data = { character_id: req.params.character_id, item_id: req.body.item_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error1"
            );
        }
        else {
            if (results[0].affectedRows == 0) {
                res.status(404).send(
                    "Item Id is invaild or You don't have that item equipped."
                );
            }
            else {
                if (!results[2][0].special_effect_attackDmg) {
                    res.locals.removeItemDmg = 0
                }
                else {
                    res.locals.removeItemDmg = results[2][0].special_effect_attackDmg;
                }
                if (!results[3][0].special_effect_health) {
                    res.locals.removeItemHealth = 0
                }
                else {
                    res.locals.removeItemHealth = results[3][0].special_effect_health;
                }
                next();
            }
        }
    }
    model.unequipItem(data, callback)
}

module.exports.removeItemStatus = (req, res, next) => {
    const data = { removeItemDmg: res.locals.removeItemDmg, removeItemHealth: res.locals.removeItemHealth, character_id: req.params.character_id, item_id: req.body.item_id }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).send(
                "Internal server error"
            );
        } else {
            res.status(200).send(`
            Item:  is successfully unequipped.
            `)
        }
    }
    model.removeItemStatus(data, callback)
}