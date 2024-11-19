const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PhieuTraController {
  getThongKe = async (req, res) => {
    try {
      const { startDate, endDate, trangThai } = req.query;

      // Lọc theo ngày và trạng thái nếu có
      const whereCondition = {};
      if (startDate) {
        whereCondition.ngayTao = { gte: new Date(startDate) };
      }
      if (endDate) {
        whereCondition.ngayTao = {
          ...whereCondition.ngayTao,
          lte: new Date(endDate),
        };
      }
      if (trangThai) {
        whereCondition.trangThai = trangThai; // Lọc theo trạng thái
      }

      // Lấy dữ liệu từ bảng PhieuTra
      const danhSach = await prisma.phieuTra.findMany({
        where: whereCondition,
        include: {
          CTPhieuTra: true, // Bao gồm chi tiết phiếu trả
          User: true, // Bao gồm thông tin người dùng
        },
      });

      // Gom nhóm và tính toán
      const thongKe = [];
      for (const [index, phieu] of danhSach.entries()) {
        const soLuongHoSo = await prisma.cTPhieuTra.count({
          where: { phieuTraId: phieu.id },
        });

        const soLuongTaiLieu = await prisma.taiLieu.count({
          where: {
            hoSoId: {
              in: (
                await prisma.cTPhieuTra.findMany({
                  where: { phieuTraId: phieu.id },
                  select: { hoSoId: true },
                })
              ).map((ct) => ct.hoSoId),
            },
          },
        });

        thongKe.push({
          stt: index + 1,
          maPhieuYC: phieu.phieuYCId,
          nguoiKhaiThac: phieu.User?.name || "N/A",
          soLuongHoSo,
          soLuongTaiLieu,
          trangThai: phieu.trangThai,
        });
      }

      res.status(200).json({ data: thongKe });
    } catch (error) {
      console.error("Error fetching Thong Ke:", error);
      res.status(500).json({ message: "Lỗi khi lấy thống kê", error });
    }
  };
}

module.exports = new PhieuTraController();
