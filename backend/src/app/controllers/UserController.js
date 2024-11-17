const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UserController = {
  // Lấy danh sách tất cả người dùng
  async getAllUsers(req, res) {
    const { role } = req.query; // Lấy role từ query parameters (nếu có)
    
    try {
      const users = await prisma.user.findMany({
        where: role ? { role } : {}, // Nếu có role, thêm điều kiện lọc theo role
      });
      
      res.json(users);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      res.status(500).json({ error: 'Không thể lấy danh sách người dùng' });
    }
  },

  // Lấy một người dùng theo ID
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(404).json({ error: 'Người dùng không tồn tại' });
      }
      res.json(user);
    } catch (error) {
      console.error('Lỗi khi lấy người dùng:', error);
      res.status(500).json({ error: 'Không thể lấy người dùng' });
    }
  },

  // Thêm người dùng mới
  async createUser(req, res) {
    const { username, password, role, name } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: { username, password, role, name },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      res.status(500).json({ error: 'Không thể tạo người dùng mới' });
    }
  },

  // Cập nhật thông tin người dùng
  async updateUser(req, res) {
    const { id } = req.params;
    const { username, password, role, name } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { username, password, role, name },
      });
      res.json(updatedUser);
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      res.status(500).json({ error: 'Không thể cập nhật người dùng' });
    }
  },

  // Xóa một người dùng
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      res.status(500).json({ error: 'Không thể xóa người dùng' });
    }
  },
};

module.exports = UserController;
