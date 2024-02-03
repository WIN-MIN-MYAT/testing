const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");

//show all messages
router.get('/', controller.readAllMessage);

//endpoint for character to create message
router.post('/',jwtMiddleware.verifyToken,controller.createMessage);

//endpoint for character to edit message
router.put('/:message_id',jwtMiddleware.verifyToken, controller.updateMessageById);

//endpoint for character to delete message
router.delete('/:message_id',jwtMiddleware.verifyToken, controller.deleteMessageById);

module.exports = router;