const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class HopCapController {
  getThongKeHopCap = async (req, res) => {
    try {
      // Lấy danh sách từ bảng "Hop"
      const danhSachHop = await prisma.hop.findMany({
        include: {
          Gia: true, // Lấy thông tin tên giá từ bảng "Gia"
          ChiTietHop: true, // Liên kết với bảng "ChiTietHop"
        },
      });

      // Xử lý dữ liệu
      const thongKe = await Promise.all(
        danhSachHop.map(async (hop, index) => {
          // Đếm số lượng hồ sơ từ bảng "ChiTietHop"
          const soLuongHoSo = hop.ChiTietHop.length;

          // Tính số lượng tài liệu từ bảng "TaiLieu"
          let soLuongTaiLieu = 0;

          for (const chiTiet of hop.ChiTietHop) {
            const taiLieuCount = await prisma.taiLieu.count({
              where: {
                hoSoId: chiTiet.hoSoId,
              },
            });
            soLuongTaiLieu += taiLieuCount;
          }

          return {
            stt: index + 1,
            gia: hop.Gia?.gia || "N/A", // Tên của giá từ bảng "Gia"
            hopCap: hop.hop || "N/A", // Tên hộp từ bảng "Hop"
            soLuongHoSo, // Số lượng hồ sơ từ "ChiTietHop"
            soLuongTaiLieu, // Số lượng tài liệu từ "TaiLieu"
          };
        })
      );

      // Trả dữ liệu về cho frontend
      res.status(200).json({ data: thongKe });
    } catch (error) {
      console.error("Error fetching thong ke hop cap:", error);
      res.status(500).json({
        message: "Lỗi khi lấy thống kê hộp cặp",
        error: error.message,
      });
    }
  };
}

module.exports = new HopCapController();
