const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');

// Route đăng nhập
router.post('/', registerController.register);


module.exports = router;
