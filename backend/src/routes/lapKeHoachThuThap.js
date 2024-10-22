const express = require('express');
const router = express.Router();

const lapKeHoachController = require('../app/controllers/LapKeHoachThuThapController');

// Route để tạo mới kế hoạch thu thập
router.post('/', lapKeHoachController.postLapKeHoach);

// Route để lấy tất cả kế hoạch thu thập
router.get('/', lapKeHoachController.getAllKeHoachThuThap);

// Route để lấy chi tiết kế hoạch thu thập theo ID
router.get('/:id', lapKeHoachController.getKeHoachThuThapById);

// Route để cập nhật kế hoạch thu thập
router.put('/:id', lapKeHoachController.updateKeHoachThuThap);

// Route để xóa kế hoạch thu thập
router.delete('/:id', lapKeHoachController.deleteKeHoachThuThap);

module.exports = router;
