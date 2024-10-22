const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

// Route đăng nhập
router.post('/', loginController.login);


module.exports = router;
