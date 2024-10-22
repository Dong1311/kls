-- CreateTable
CREATE TABLE "KeHoachThuThap" (
    "id" SERIAL NOT NULL,
    "soKeHoach" TEXT NOT NULL,
    "tieuDe" TEXT NOT NULL,
    "nguoiTao" TEXT NOT NULL,
    "nguoiDuyet" TEXT,
    "ngayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noiDung" TEXT,
    "donViNopLuu" TEXT,
    "ngayBatDau" TIMESTAMP(3),
    "ngayKetThuc" TIMESTAMP(3),
    "taiLieuHD" TEXT,
    "trangThai" TEXT NOT NULL,

    CONSTRAINT "KeHoachThuThap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HoSo" (
    "id" SERIAL NOT NULL,
    "maHoSo" TEXT NOT NULL,
    "maDinhDanhCoQuan" TEXT NOT NULL,
    "mucLucSoNamHS" TEXT NOT NULL,
    "soVaKyHieuHoSo" TEXT NOT NULL,
    "tieuDeHoSo" TEXT NOT NULL,
    "thoiHanBaoQuan" TEXT NOT NULL,
    "cheDoSuDung" TEXT NOT NULL,
    "ngonNgu" TEXT NOT NULL,
    "thoiGianBatDau" TIMESTAMP(3),
    "thoiGianKetThuc" TIMESTAMP(3),
    "tongSoVanBanTrongHS" INTEGER NOT NULL,
    "chuGiai" TEXT,
    "kyHieuThongTin" TEXT,
    "tuKhoa" TEXT,
    "soLuongTo" INTEGER NOT NULL,
    "soLuongTrang" INTEGER NOT NULL,
    "tinhTrangVatLy" TEXT NOT NULL,
    "trangThai" TEXT NOT NULL,
    "keHoachThuThapId" INTEGER NOT NULL,

    CONSTRAINT "HoSo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaiLieu" (
    "id" SERIAL NOT NULL,
    "khungBienMuc" TEXT NOT NULL,
    "maDinhDanhVanBan" TEXT NOT NULL,
    "hoSoId" INTEGER NOT NULL,
    "sttTrongHoSo" INTEGER NOT NULL,
    "tenLoaiVanBan" TEXT NOT NULL,
    "soVanBan" TEXT NOT NULL,
    "kyHieuTaiLieu" TEXT NOT NULL,
    "ngayThangNamVB" TIMESTAMP(3) NOT NULL,
    "tenCoQuanBanHanh" TEXT NOT NULL,
    "trichYeuNoiDung" TEXT NOT NULL,
    "ngonNgu" TEXT NOT NULL,
    "soLuongTrang" INTEGER NOT NULL,
    "ghiChu" TEXT,
    "kyHieuThongTin" TEXT,
    "tuKhoa" TEXT,
    "cheDoSuDung" TEXT NOT NULL,
    "mucDoTinCay" TEXT NOT NULL,
    "butTich" TEXT,
    "tinhTrangVatLy" TEXT NOT NULL,

    CONSTRAINT "TaiLieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BienBanBanGiao" (
    "id" SERIAL NOT NULL,
    "soBienBan" TEXT NOT NULL,
    "tieuDe" TEXT NOT NULL,
    "ngayLap" TIMESTAMP(3) NOT NULL,
    "canCu" TEXT NOT NULL,
    "tenCoQuanThuThap" TEXT NOT NULL,
    "donViNopLuu" TEXT NOT NULL,
    "daiDienBenGiao" TEXT NOT NULL,
    "daiDienBenNhan" TEXT NOT NULL,
    "thoiGianHSTL" TIMESTAMP(3),
    "tinhTrangVatLy" TEXT NOT NULL,
    "trangThaiBienBan" TEXT NOT NULL,

    CONSTRAINT "BienBanBanGiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LichSuChinhSua" (
    "id" SERIAL NOT NULL,
    "maHoatDong" INTEGER NOT NULL,
    "maHoSo" INTEGER NOT NULL,
    "maTaiLieu" INTEGER NOT NULL,
    "nguoiThucHien" TEXT NOT NULL,
    "thoiGianThucHien" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LichSuChinhSua_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuYeuCau" (
    "id" SERIAL NOT NULL,
    "soPhieu" TEXT NOT NULL,
    "loaiHinhKhaiThac" TEXT NOT NULL,
    "ngayYeuCau" TIMESTAMP(3) NOT NULL,
    "nguoiKhaiThac" TEXT NOT NULL,
    "nguoiDuyet" TEXT NOT NULL,
    "doiTuongKhaiThac" TEXT NOT NULL,
    "mucDichKhaiThac" TEXT NOT NULL,
    "khaiThacTuNgay" TIMESTAMP(3) NOT NULL,
    "khaiThacDenNgay" TIMESTAMP(3) NOT NULL,
    "hinhThucKhaiThac" TEXT NOT NULL,
    "loaiHoatDong" TEXT NOT NULL,
    "noiDungYeuCau" TEXT NOT NULL,
    "ghiChu" TEXT,
    "trangThai" TEXT NOT NULL,

    CONSTRAINT "PhieuYeuCau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuTra" (
    "id" SERIAL NOT NULL,
    "soPhieu" TEXT NOT NULL,
    "soPhieuYeuCau" TEXT NOT NULL,
    "ngayTao" TIMESTAMP(3) NOT NULL,
    "nguoiTao" TEXT NOT NULL,
    "trangThai" TEXT NOT NULL,

    CONSTRAINT "PhieuTra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuyDinhTieuHuy" (
    "id" SERIAL NOT NULL,
    "qdSo" TEXT NOT NULL,
    "tieuDeQuyetDinh" TEXT NOT NULL,
    "ngayTao" TIMESTAMP(3) NOT NULL,
    "nguoiDuyet" TEXT NOT NULL,
    "nguoiTao" TEXT NOT NULL,
    "noiDungTieuHuy" TEXT NOT NULL,
    "lyDoTieuHuy" TEXT NOT NULL,
    "trangThai" TEXT NOT NULL,

    CONSTRAINT "QuyDinhTieuHuy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonViNopLuu" (
    "id" SERIAL NOT NULL,
    "maDonVi" TEXT NOT NULL,
    "tenDonVi" TEXT NOT NULL,
    "diaChi" TEXT NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "DonViNopLuu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhongBan" (
    "id" SERIAL NOT NULL,
    "maPhongBan" TEXT NOT NULL,
    "tenPhongBan" TEXT NOT NULL,
    "maDonVi" TEXT NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "PhongBan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CanBo" (
    "id" SERIAL NOT NULL,
    "maCanBo" TEXT NOT NULL,
    "maDonVi" TEXT NOT NULL,
    "chucVu" TEXT NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "CanBo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kho" (
    "id" SERIAL NOT NULL,
    "maKho" TEXT NOT NULL,
    "tenKho" TEXT NOT NULL,
    "diaChiKho" TEXT NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "Kho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhongLuuTru" (
    "id" SERIAL NOT NULL,
    "maPhongLuuTru" TEXT NOT NULL,
    "tenPhongLuuTru" TEXT NOT NULL,
    "coQuanBanHanh" TEXT NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "PhongLuuTru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeHoachThuThap_soKeHoach_key" ON "KeHoachThuThap"("soKeHoach");

-- CreateIndex
CREATE UNIQUE INDEX "HoSo_maHoSo_key" ON "HoSo"("maHoSo");

-- CreateIndex
CREATE UNIQUE INDEX "TaiLieu_maDinhDanhVanBan_key" ON "TaiLieu"("maDinhDanhVanBan");

-- AddForeignKey
ALTER TABLE "HoSo" ADD CONSTRAINT "HoSo_keHoachThuThapId_fkey" FOREIGN KEY ("keHoachThuThapId") REFERENCES "KeHoachThuThap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaiLieu" ADD CONSTRAINT "TaiLieu_hoSoId_fkey" FOREIGN KEY ("hoSoId") REFERENCES "HoSo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
