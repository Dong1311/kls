const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BienBanBanGiaoController {
    // Tạo mới biên bản bàn giao
    async createBienBanBanGiao(req, res) {
        const {
            soBienBan,
            tieuDe,
            ngayLap,
            canCu,
            tenCoQuanThuThap,
            donViNopLuu,
            daiDienBenGiaoId,
            daiDienBenNhanId,
            trangThaiBienBan,
            hoSos
        } = req.body;
    
        try {
            const bienBan = await prisma.bienBanBanGiao.create({
                data: {
                    soBienBan,
                    tieuDe,
                    ngayLap: new Date(ngayLap),
                    canCu: { connect: { id: canCu } },
                    tenCoQuanThuThap,
                    donViNopLuu: { connect: { id: donViNopLuu } },
                    daiDienBenGiaoId, // Chỉ sử dụng ID đơn giản
                    daiDienBenNhanId, // Chỉ sử dụng ID đơn giản
                    trangThaiBienBan,
                    hoSos: {
                        connect: hoSos.map(id => ({ id }))
                    }
                }
            });
    
            res.status(201).json({
                message: 'Biên bản bàn giao đã được tạo thành công',
                data: bienBan,
            });
        } catch (error) {
            console.error('Error creating BienBanBanGiao:', error);
            res.status(500).json({
                message: 'Lỗi khi tạo biên bản bàn giao',
                error: error.message,
            });
        }
    }
    
    
 
    // Lấy danh sách tất cả các biên bản bàn giao
    async getBienBanBanGiaoList(req, res) {
        const { tieuDe, ngayLap } = req.query; 
    
        try {
            const filter = {};
    
            if (tieuDe) {
                filter.tieuDe = {
                    contains: tieuDe,
                    mode: 'insensitive', 
                };
            }
    
            if (ngayLap && !isNaN(new Date(ngayLap))) {
                filter.ngayLap = {
                    equals: new Date(ngayLap),
                };
            }
    
            const bienBanList = await prisma.bienBanBanGiao.findMany({
                where: filter,
                include: {
                    canCu: true, 
                    donViNopLuu: true, 
                },
            });
            const statusOrder = {
                'Tạo mới': 0,
                'Đã gửi duyệt': 1,
                'Đã nhận': 2,
            };

            bienBanList.sort((a, b) => {
                const statusA = statusOrder[a.trangThaiBienBan] !== undefined ? statusOrder[a.trangThaiBienBan] : 999;
                const statusB = statusOrder[b.trangThaiBienBan] !== undefined ? statusOrder[b.trangThaiBienBan] : 999;
            
                return statusA - statusB; 
            });
            
    
            res.status(200).json(bienBanList);
        } catch (error) {
            console.error('Error fetching BienBanBanGiao list:', error);
            res.status(500).json({
                message: 'Lỗi khi lấy danh sách biên bản bàn giao',
                error: error.message,
            });
        }
    }

    // Lấy chi tiết một biên bản bàn giao
    async getBienBanBanGiaoDetail(req, res) {
        const { id } = req.params;

        try {
            const bienBan = await prisma.bienBanBanGiao.findUnique({
                where: { id: parseInt(id, 10) },
                include: {
                    canCu: { // Lấy thông tin từ bảng KeHoachThuThap
                        select: { id: true, tieuDe: true }
                    },
                    donViNopLuu: { // Lấy thông tin từ bảng PhongBan
                        select: { id: true, tenPhongBan: true }
                    }
                }
            });

            if (!bienBan) {
                return res.status(404).json({ message: 'Không tìm thấy biên bản bàn giao' });
            }

            res.status(200).json(bienBan);
        } catch (error) {
            console.error('Error fetching BienBanBanGiao detail:', error);
            res.status(500).json({
                message: 'Lỗi khi lấy chi tiết biên bản bàn giao',
                error: error.message,
            });
        }
    }

    // Cập nhật một biên bản bàn giao
    // async updateBienBanBanGiao(req, res) {
    //     const { id } = req.params;
    //     const {
    //         soBienBan,
    //         tieuDe,
    //         ngayLap,
    //         canCuId, 
    //         tenCoQuanThuThap,
    //         donViNopLuuId, 
    //         daiDienBenGiaoId,
    //         daiDienBenNhanId,
    //         trangThaiBienBan,
    //         hoSos = []
    //     } = req.body;
    
    //     try {
    //         const bienBan = await prisma.bienBanBanGiao.update({
    //             where: { id: parseInt(id, 10) },
    //             data: {
    //                 soBienBan,
    //                 tieuDe,
    //                 ngayLap: new Date(ngayLap),
    //                 canCu: { 
    //                     connect: { 
    //                         id: parseInt(canCuId, 10) 
    //                     } 
    //                 },
    //                 tenCoQuanThuThap,
    //                 donViNopLuu: { 
    //                     connect: { 
    //                         id: parseInt(donViNopLuuId, 10) 
    //                     } 
    //                 },
    //                 daiDienBenGiaoId,
    //                 daiDienBenNhanId,
    //                 trangThaiBienBan,
    //                 hoSos: {
    //                     set: hoSos.map(id => ({ id: parseInt(id, 10) })) 
    //                 }
    //             }
    //         });
    
    //         res.status(200).json({
    //             message: 'Biên bản bàn giao đã được cập nhật thành công',
    //             data: bienBan,
    //         });
    //     } catch (error) {
    //         console.error('Error updating BienBanBanGiao:', error);
    //         res.status(500).json({
    //             message: 'Lỗi khi cập nhật biên bản bàn giao',
    //             error: error.message,
    //         });
    //     }
    // }
    async updateBienBanBanGiao(req, res) {
        const { id } = req.params;
        const {
            soBienBan,
            tieuDe,
            ngayLap,
            canCuId, 
            tenCoQuanThuThap,
            donViNopLuuId, 
            daiDienBenGiaoId,
            daiDienBenNhanId,
            trangThaiBienBan,
            hoSos = []
        } = req.body;
    
        try {
            // Cập nhật Biên bản bàn giao
            const bienBan = await prisma.bienBanBanGiao.update({
                where: { id: parseInt(id, 10) },
                data: {
                    soBienBan,
                    tieuDe,
                    ngayLap: new Date(ngayLap),
                    canCu: { 
                        connect: { 
                            id: parseInt(canCuId, 10) 
                        } 
                    },
                    tenCoQuanThuThap,
                    donViNopLuu: { 
                        connect: { 
                            id: parseInt(donViNopLuuId, 10) 
                        } 
                    },
                    daiDienBenGiaoId,
                    daiDienBenNhanId,
                    trangThaiBienBan,
                    hoSos: {
                        connect: hoSos.map(id => ({ id: parseInt(id, 10) })) // Sử dụng connect thay vì set
                    }
                }
            });
    
            // Cập nhật bienBanBanGiaoId trong các hồ sơ được kết nối (nếu cần)
            await prisma.hoSo.updateMany({
                where: {
                    id: { in: hoSos.map(id => parseInt(id, 10)) }
                },
                data: {
                    bienBanBanGiaoId: bienBan.id 
                }
            });
    
            res.status(200).json({
                message: 'Biên bản bàn giao đã được cập nhật thành công',
                data: bienBan,
            });
        } catch (error) {
            console.error('Error updating BienBanBanGiao:', error);
            res.status(500).json({
                message: 'Lỗi khi cập nhật biên bản bàn giao',
                error: error.message,
            });
        }
    }
    
    
    

    // Xóa một biên bản bàn giao
    async deleteBienBanBanGiao(req, res) {
        const { id } = req.params;

        try {
            await prisma.bienBanBanGiao.delete({
                where: { id: parseInt(id, 10) },
            });

            res.status(200).json({ message: 'Xóa biên bản bàn giao thành công' });
        } catch (error) {
            console.error('Error deleting BienBanBanGiao:', error);
            res.status(500).json({
                message: 'Lỗi khi xóa biên bản bàn giao',
                error: error.message,
            });
        }
    }

    async getHoSoByBienBanBanGiaoId(req, res) {
        const { bienBanBanGiaoId } = req.params;
    
        try {
            const hoSoList = await prisma.hoSo.findMany({
                where: {
                    bienBanBanGiaoId: parseInt(bienBanBanGiaoId, 10),
                },
            });
            res.status(200).json(hoSoList);
        } catch (error) {
            console.error('Error fetching HoSo by BienBanBanGiaoId:', error);
            res.status(500).json({
                message: 'Lỗi khi lấy danh sách hồ sơ theo biên bản bàn giao',
                error: error.message,
            });
        }
    }
    
}

module.exports = new BienBanBanGiaoController();
