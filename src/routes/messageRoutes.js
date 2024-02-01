const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");


router.get('/', controller.readAllMessage);
router.post('/',jwtMiddleware.verifyToken,controller.createMessage);
router.put('/:message_id',jwtMiddleware.verifyToken, controller.updateMessageById);
router.delete('/:message_id',jwtMiddleware.verifyToken, controller.deleteMessageById);

module.exports = router;