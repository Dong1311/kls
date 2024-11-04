// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../app/controllers/UserController');

const router = express.Router();

// Lấy tất cả người dùng
router.get('/', UserController.getAllUsers);

// Lấy một người dùng theo ID
router.get('/:id', UserController.getUserById);

// Tạo người dùng mới
router.post('/', UserController.createUser);

// Cập nhật người dùng
router.put('/:id', UserController.updateUser);

// Xóa người dùng
router.delete('/:id', UserController.deleteUser);

module.exports = router;
