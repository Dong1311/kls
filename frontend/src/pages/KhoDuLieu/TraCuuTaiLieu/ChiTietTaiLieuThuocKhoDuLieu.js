import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebaseConfig';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import addIcon from '../../../assets/images/Function/Add.png';

const ChiTietTaiLieu = () => {
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
    ngonNgu: 'VN',
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
  const [hoSoTrangThai, setHoSoTrangThai] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

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
        setHoSoTrangThai(data.trangThai); 
      })
      .catch(error => console.error('Lỗi khi lấy chi tiết tài liệu hoặc trạng thái hồ sơ:', error));
  }, [taiLieuId]);


  const handleBack = () => navigate(-1);

  const isEditable = ['Tạo mới', 'Từ chối nộp lưu', 'Cần thu thập lại'].includes(hoSoTrangThai);

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Chi tiết tài liệu</h5>
      <div className="row g-3">
        <TextInput label="Tên tài liệu" name="tenTaiLieu" value={taiLieu.tenTaiLieu} disabled={!isEditable} />
        <TextInput label="Khung biên mục" name="khungBienMuc" value={taiLieu.khungBienMuc} disabled={!isEditable} />
        <SelectInput label="Tên cơ quan ban hành" name="tenCoQuanBanHanh" value={taiLieu.tenCoQuanBanHanh} options={['Bộ Nội vụ', 'Bộ Quốc phòng']} disabled={!isEditable} />
        <TextInput label="Mã định danh văn bản" name="maDinhDanhVanBan" value={taiLieu.maDinhDanhVanBan} disabled={!isEditable} />
        <TextInput label="Trích yếu nội dung" name="trichYeuNoiDung" value={taiLieu.trichYeuNoiDung} disabled={!isEditable} />
        <TextInput label="Tên hồ sơ" name="hoSoTen" value={taiLieu.hoSoTen} disabled />

        <SelectInput label="Ngôn ngữ" name="ngonNgu" value={taiLieu.ngonNgu} options={['VN', 'EN']} disabled={!isEditable} />
        <TextInput label="STT trong hồ sơ" name="sttTrongHoSo" value={taiLieu.sttTrongHoSo} disabled={!isEditable} />
        <TextInput label="Số lượng trang" name="soLuongTrang" value={taiLieu.soLuongTrang} disabled={!isEditable} />
        
        <TextInput label="Tên loại văn bản" name="tenLoaiVanBan" value={taiLieu.tenLoaiVanBan} disabled={!isEditable} />
        <TextInput label="Ghi chú" name="ghiChu" value={taiLieu.ghiChu} disabled={!isEditable} />
        <TextInput label="Số văn bản" name="soVanBan" value={taiLieu.soVanBan} disabled={!isEditable} />
        <TextInput label="Ký hiệu thông tin" name="kyHieuThongTin" value={taiLieu.kyHieuThongTin} disabled={!isEditable} />
        <TextInput label="Ký hiệu tài liệu" name="kyHieuTaiLieu" value={taiLieu.kyHieuTaiLieu} disabled={!isEditable} />
        <TextInput label="Từ khóa" name="tuKhoa" value={taiLieu.tuKhoa} disabled={!isEditable} />
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>Ngày tháng năm VB:</label>
          <input type="date" className="form-control" name="ngayThangNamVB" value={taiLieu.ngayThangNamVB ? new Date(taiLieu.ngayThangNamVB).toISOString().split('T')[0] : ''} disabled={!isEditable} />
        </div>
        <TextInput label="Bút tích" name="butTich" value={taiLieu.butTich} disabled={!isEditable} />
        <SelectInput label="Chế độ sử dụng" name="cheDoSuDung" value={taiLieu.cheDoSuDung} options={['Hạn chế', 'Không hạn chế']} disabled={!isEditable} />
        <SelectInput label="Tình trạng vật lý" name="tinhTrangVatLy" value={taiLieu.tinhTrangVatLy} options={['Bị mốc nhẹ', 'Nguyên vẹn']} disabled={!isEditable} />
        <SelectInput label="Mức độ tin cậy" name="mucDoTinCay" value={taiLieu.mucDoTinCay} options={['Cao', 'Thấp']} disabled={!isEditable} />
      </div>

      {uploadStatus && <div className="alert alert-info mt-3">{uploadStatus}</div>}


      {taiLieu.link && (
        <div className="mt-3">
          <a href={taiLieu.link} target="_blank" rel="noopener noreferrer">
            Xem tài liệu tại đây
          </a>
        </div>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary mx-2" onClick={handleBack}>Đóng</button>
      </div>
    </div>
  );
};

export default ChiTietTaiLieu;
