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

// Route để cập nhật tài liệu hướng dẫn của kế hoạch thu thập
router.put('/:id/tai-lieu', lapKeHoachController.updateTaiLieuHD);

router.put('/:id/trang-thai', lapKeHoachController.updateTrangThaiKeHoach);

router.post('/tai-lieu-huong-dan', lapKeHoachController.createTaiLieuHuongDan);

// Thêm route mới để lấy danh sách tài liệu hướng dẫn
router.get('/:id/tai-lieu-huong-dan', lapKeHoachController.getTaiLieuHuongDanByKeHoachId);

// Route xóa tài liệu hướng dẫn
router.delete('/tai-lieu-huong-dan/:id', lapKeHoachController.deleteTaiLieuHuongDan);

// Route để lấy danh sách hồ sơ theo id kế hoạch thu thập
router.get('/:id/ho-so', lapKeHoachController.getHoSoByKeHoachThuThapId);

module.exports = router;
