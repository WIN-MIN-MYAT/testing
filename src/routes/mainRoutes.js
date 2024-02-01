const express=require('express')
const router=express.Router()
const userRoutes=require('./userRoutes')
const taskRoutes=require("./taskRoutes")
const taskProgressRoutes=require('./taskProgressRoutes')

router.use("/users",userRoutes);
router.use("/tasks",taskRoutes);
router.use('/task_progress',taskProgressRoutes)

const messageRoutes=require("./messageRoutes")
router.use("/messages",messageRoutes)


const itemRoutes=require('./itemRoutes');
router.use("/items",itemRoutes);

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