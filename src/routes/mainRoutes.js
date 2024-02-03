const express=require('express')
const router=express.Router()

const messageRoutes=require("./messageRoutes")
router.use("/messages",messageRoutes)

const questRoutes=require('./questRoutes')
router.use('/quests',questRoutes)

const characterRoutes=require('./characterRoutes');
router.use("/characters",characterRoutes)

const characterController = require('../controllers/characterController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");


router.post("/login", characterController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", characterController.checkAlreadyExist,bcryptMiddleware.hashPassword,characterController.createNewCharacter,characterController.addItemsToNewCharacter,characterController.addStatsToNewCharacter,  jwtMiddleware.generateToken, jwtMiddleware.sendToken);



module.exports=router;