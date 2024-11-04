const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PhongBanController {
  // Lấy danh sách tất cả phòng ban
  async getAllPhongBan(req, res) {
    try {
      const phongBans = await prisma.phongBan.findMany();
      res.status(200).json(phongBans);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng ban:', error);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách phòng ban' });
    }
  }

  // Lấy thông tin chi tiết một phòng ban theo ID
  async getPhongBanById(req, res) {
    const { id } = req.params;
    try {
      const phongBan = await prisma.phongBan.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!phongBan) {
        return res.status(404).json({ message: 'Không tìm thấy phòng ban' });
      }
      res.status(200).json(phongBan);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phòng ban:', error);
      res.status(500).json({ message: 'Lỗi khi lấy thông tin phòng ban' });
    }
  }

  // Tạo mới một phòng ban
  async createPhongBan(req, res) {
    const { maPhongBan, tenPhongBan, maDonVi, ghiChu, chucNang, nhiemVu } = req.body;
    try {
      const newPhongBan = await prisma.phongBan.create({
        data: {
          maPhongBan,
          tenPhongBan,
          maDonVi,
          ghiChu,
          chucNang,
          nhiemVu,
        },
      });
      res.status(201).json({ message: 'Tạo phòng ban thành công', data: newPhongBan });
    } catch (error) {
      console.error('Lỗi khi tạo phòng ban:', error);
      res.status(500).json({ message: 'Lỗi khi tạo phòng ban' });
    }
  }

  // Cập nhật một phòng ban theo ID
  async updatePhongBan(req, res) {
    const { id } = req.params;
    const { maPhongBan, tenPhongBan, maDonVi, ghiChu, chucNang, nhiemVu } = req.body;
    try {
      const updatedPhongBan = await prisma.phongBan.update({
        where: { id: parseInt(id, 10) },
        data: {
          maPhongBan,
          tenPhongBan,
          maDonVi,
          ghiChu,
          chucNang,
          nhiemVu,
        },
      });
      res.status(200).json({ message: 'Cập nhật phòng ban thành công', data: updatedPhongBan });
    } catch (error) {
      console.error('Lỗi khi cập nhật phòng ban:', error);
      res.status(500).json({ message: 'Lỗi khi cập nhật phòng ban' });
    }
  }

  // Xóa một phòng ban theo ID
  async deletePhongBan(req, res) {
    const { id } = req.params;
    try {
      await prisma.phongBan.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(200).json({ message: 'Xóa phòng ban thành công' });
    } catch (error) {
      console.error('Lỗi khi xóa phòng ban:', error);
      res.status(500).json({ message: 'Lỗi khi xóa phòng ban' });
    }
  }
}

module.exports = new PhongBanController();
