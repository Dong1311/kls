import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';

const ChiTietTaiLieuTuChoiNLLS = () => {
  const { taiLieuId } = useParams();
  const navigate = useNavigate();
  const [taiLieu, setTaiLieu] = useState({
    tenTaiLieu: '',
    khungBienMuc: '',
    maDinhDanhTL: '',
    maDinhDanhVanBan: '',
    hoSoId: '',
    sttTrongHoSo: '',
    tenLoaiVanBan: '',
    soVanBan: '',
    kyHieuTaiLieu: '',
    ngayThangNamVB: '',
    tenCoQuanBanHanh: 'Bộ Nội vụ',
    trichYeuNoiDung: '',
    ngonNgu: 'Tiếng Việt',
    soLuongTrang: '',
    ghiChu: '',
    kyHieuThongTin: '',
    tuKhoa: '',
    butTich: '',
    cheDoSuDung: 'Mật',
    mucDoTinCay: 'Cao',
    tinhTrangVatLy: 'Nguyên vẹn',
    ngayTao: '',
    link: ''
  });

  useEffect(() => {
    fetch(`/api/tai-lieu/${taiLieuId}`)
      .then(response => response.json())
      .then(data => {
        setTaiLieu(data);
        return fetch(`/api/ho-so/${data.hoSoId}/name-status`);
      })
      .then(response => response.json())
      .then(data => {
        setTaiLieu(prevState => ({
          ...prevState,
          hoSoTen: data.tenHoSo
        }));
      })
      .catch(error => console.error('Lỗi khi lấy chi tiết tài liệu:', error));
  }, [taiLieuId]);

  const handleBack = () => navigate(-1);

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Chi tiết tài liệu</h5>
      <div className="row g-3">
        <TextInput label="Tên tài liệu" name="tenTaiLieu" value={taiLieu.tenTaiLieu} disabled />
        <TextInput label="Khung biên mục" name="khungBienMuc" value={taiLieu.khungBienMuc} disabled />
        <TextInput label="Tên cơ quan ban hành" name="tenCoQuanBanHanh" value={taiLieu.tenCoQuanBanHanh} options={['Bộ Nội vụ', 'Bộ Quốc phòng']} disabled />
        <TextInput label="Mã định danh văn bản" name="maDinhDanhVanBan" value={taiLieu.maDinhDanhVanBan} disabled />
        <TextInput label="Trích yếu nội dung" name="trichYeuNoiDung" value={taiLieu.trichYeuNoiDung} disabled />
        <TextInput label="Tên hồ sơ" name="hoSoTen" value={taiLieu.hoSoTen} disabled />
        <TextInput label="Ngôn ngữ" name="ngonNgu" value={taiLieu.ngonNgu} options={['Tiếng Việt', 'Tiếng Anh']} disabled={true} />
        <TextInput label="STT trong hồ sơ" name="sttTrongHoSo" value={taiLieu.sttTrongHoSo} disabled />
        <TextInput label="Số lượng trang" name="soLuongTrang" value={taiLieu.soLuongTrang} disabled />
        <TextInput label="Tên loại văn bản" name="tenLoaiVanBan" value={taiLieu.tenLoaiVanBan} disabled />
        <TextInput label="Ghi chú" name="ghiChu" value={taiLieu.ghiChu} disabled />
        <TextInput label="Số văn bản" name="soVanBan" value={taiLieu.soVanBan} disabled />
        <TextInput label="Ký hiệu thông tin" name="kyHieuThongTin" value={taiLieu.kyHieuThongTin} disabled />
        <TextInput label="Ký hiệu tài liệu" name="kyHieuTaiLieu" value={taiLieu.kyHieuTaiLieu} disabled />
        <TextInput label="Từ khóa" name="tuKhoa" value={taiLieu.tuKhoa} disabled />
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2 text-start" style={{ minWidth: '180px' }} disabled>Ngày tháng năm VB:</label>
          <input type="date" className="form-control" name="ngayThangNamVB" value={taiLieu.ngayThangNamVB ? new Date(taiLieu.ngayThangNamVB).toISOString().split('T')[0] : ''} disabled />
        </div>
        <TextInput label="Bút tích" name="butTich" value={taiLieu.butTich} disabled />
        <TextInput label="Chế độ sử dụng" name="cheDoSuDung" value={taiLieu.cheDoSuDung} options={['Mật', 'Không mật']} disabled={true} />
        <TextInput label="Tình trạng vật lý" name="tinhTrangVatLy" value={taiLieu.tinhTrangVatLy} options={['Bị mốc nhẹ', 'Nguyên vẹn']} disabled={true} />
        <TextInput label="Mức độ tin cậy" name="mucDoTinCay" value={taiLieu.mucDoTinCay} options={['Cao', 'Thấp']} disabled={true} />
      </div>

      {/* Liên kết để xem tài liệu nếu có link */}
      {taiLieu.link && (
        <div className="mt-3">
          <a href={taiLieu.link} target="_blank" rel="noopener noreferrer">
            Xem tài liệu tại đây
          </a>
        </div>
      )}

      {/* Nút đóng */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary mx-2" onClick={handleBack}>Đóng</button>
      </div>
    </div>
  );
};

export default ChiTietTaiLieuTuChoiNLLS;
