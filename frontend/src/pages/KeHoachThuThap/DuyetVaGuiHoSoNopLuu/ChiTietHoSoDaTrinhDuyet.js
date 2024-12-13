import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputField from '../../../components/InputField';
import editIcon from '../../../assets/images/Function/ChinhSua.png';
import deleteIcon from '../../../assets/images/Function/DeleteFile.png';
import { Link } from 'react-router-dom';

const ChiTietHoSoDaTrinhDuyet = () => {
  const { id } = useParams();
  const [hoSo, setHoSo] = useState(null);
  const [taiLieuList, setTaiLieuList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keHoachThuThap, setKeHoachThuThap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chi tiết hồ sơ
    fetch(`/api/ho-so/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu hồ sơ');
        return response.json();
      })
      .then((data) => {
        setHoSo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  
    // Fetch danh sách tài liệu
    fetch(`/api/ho-so/${id}/tai-lieu`)
      .then((response) => response.json())
      .then((data) => setTaiLieuList(data))
      .catch((error) => console.error('Lỗi khi lấy danh sách tài liệu:', error));
  }, [id]);  // Chỉ khi `id` thay đổi thì mới thực hiện
  
  // Thêm một useEffect để fetch kế hoạch thu thập khi `hoSo` đã được lấy và có `keHoachThuThapId`
  useEffect(() => {
    if (hoSo && hoSo.keHoachThuThapId) {
      fetch(`/api/lap-ke-hoach-thu-thap/${hoSo.keHoachThuThapId}`)
        .then((response) => response.json())
        .then((data) => {
          setKeHoachThuThap(data);
        })
        .catch((error) => console.error('Lỗi khi lấy kế hoạch thu thập:', error));
    }
  }, [hoSo]);  // Chỉ khi `hoSo` thay đổi thì mới thực hiện
  

  const handleDuyetVaGui = () => {
    const updatedHoSo = { ...hoSo, trangThai: 'Đã trình NLLS' };
    fetch(`/api/ho-so/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHoSo),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Duyệt hồ sơ thất bại');
        return response.json();
      })
      .then((data) => {
        setHoSo(data);
        alert('Hồ sơ đã được trình NLLS.');
        navigate(-1);
      })
      .catch((error) => {
        console.error('Lỗi khi duyệt hồ sơ:', error);
        setError('Lỗi khi duyệt hồ sơ');
      });
  };

  const handleTuChoi = () => {
    const updatedHoSo = { ...hoSo, trangThai: 'Từ chối nộp lưu' };
    fetch(`/api/ho-so/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHoSo),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Từ chối hồ sơ thất bại');
        return response.json();
      })
      .then((data) => {
        setHoSo(data);
        alert('Hồ sơ đã bị từ chối.');
        navigate(-1);
      })
      .catch((error) => {
        console.error('Lỗi khi từ chối hồ sơ:', error);
        setError('Lỗi khi từ chối hồ sơ');
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!hoSo) return <div>Không tìm thấy hồ sơ</div>;

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết hồ sơ: {hoSo.tieuDeHoSo}
      </h5>

      <div className="row g-3 mb-4">
        {/* Các trường thông tin chi tiết hồ sơ */}
        <InputField label="Mã hồ sơ" name="maHoSo" value={hoSo.maHoSo} disabled />
        <InputField label="Ký hiệu thông tin" name="kyHieuThongTin" value={hoSo.kyHieuThongTin} disabled />
        <InputField label="Mã định danh cơ quan" name="maDinhDanhCoQuan" value={hoSo.maDinhDanhCoQuan} disabled />
        <InputField label="Người tạo" name="nguoiTao" value={hoSo.nguoiTao} disabled />
        <InputField label="Mục lục số/năm HS" name="mucLucSoNamHS" value={hoSo.mucLucSoNamHS} disabled />
        <InputField label="Ngày tạo" name="ngayTao" type="date" value={hoSo.ngayTao ? formatDate(hoSo.ngayTao) : ''} disabled />
        <InputField label="Số và ký hiệu hồ sơ" name="soVaKyHieuHoSo" value={hoSo.soVaKyHieuHoSo} disabled />
        <InputField label="Tổng số tài liệu" name="tongSoTaiLieu" value={hoSo.tongSoTaiLieu} disabled />
        <InputField label="Tiêu đề hồ sơ" name="tieuDeHoSo" value={hoSo.tieuDeHoSo} disabled />
        <InputField label="Tổng số trang" name="tongSoTrang" value={hoSo.tongSoTrang} disabled />
        <InputField label="Kế hoạch thu thập" name="tenKeHoachThuThap" value={keHoachThuThap ? keHoachThuThap.tieuDe : ''} disabled />
        <InputField label="Chế độ sử dụng" name="cheDoSuDung" value={hoSo.cheDoSuDung} disabled />

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày bắt đầu:</label>
          <input type="date" className="form-control" name="ngayBatDau" value={hoSo.ngayBatDau ? new Date(hoSo.ngayBatDau).toISOString().split('T')[0] : ''} disabled />
        </div>
        <InputField label="Tình trạng vật lý" name="tinhTrangVatLy" value={hoSo.tinhTrangVatLy} disabled />

        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>Ngày kết thúc:</label>
          <input type="date" className="form-control" name="ngayKetThuc" value={hoSo.ngayKetThuc ? new Date(hoSo.ngayKetThuc).toISOString().split('T')[0] : ''} disabled />
        </div>
        <InputField label="Từ khóa" name="tuKhoa" value={hoSo.tuKhoa} disabled/>

        <InputField label="Thời gian bảo quản" name="thoiHanBaoQuan" value={hoSo.thoiHanBaoQuan} disabled />

        <InputField label="Chú giải" name="chuGiai" value={hoSo.chuGiai} disabled />
        <InputField label="Đơn vị nộp lưu" name="donViNopLuu" value={hoSo.donViNopLuu} disabled />
        <InputField label="Ngôn ngữ" name="ngonNgu" value={hoSo.ngonNgu} disabled />

        <InputField label="Trạng thái" value={hoSo.trangThai} disabled />
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger mx-2" onClick={handleTuChoi} style={{ minWidth: '180px' }}>
          Từ chối
        </button>
        <button className="btn btn-success mx-2" onClick={handleDuyetVaGui} style={{ minWidth: '180px' }}>
          Duyệt và gửi
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)} style={{ minWidth: '180px' }}>
          Đóng
        </button>
      </div>

      {/* Danh sách tài liệu */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        <h6 className="mb-3">Danh sách tài liệu</h6>
        <table className="table table-striped mt-3">
          <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã tài liệu</th>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Trích yếu nội dung</th>
              <th scope="col">Chế độ sử dụng</th>
              {/* <th scope="col">Đơn vị nộp lưu</th> */}
              <th scope="col">Trạng thái</th>
              <th scope="col">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {taiLieuList.length > 0 ? (
              taiLieuList.map((taiLieu, index) => (
                <tr key={taiLieu.id}>
                  <td>{index + 1}</td>
                  <td>TL000{taiLieu.id}</td>
                  <td>
                    <Link 
                      to={`/ho-so-da-trinh-duyet/${id}/tai-lieu/${taiLieu.id}`}
                      style={{ color: '#043371', display: 'block' }} // Dùng `display: block` để căn chỉnh link trong ô
                    >
                      {taiLieu.tenTaiLieu}
                    </Link>
                  </td>
                  <td>
                    <a href={taiLieu.link} target="_blank" rel="noopener noreferrer" style={{ color: '#043371' }}>
                      Xem nội dung
                    </a>
                  </td>
                  <td>{taiLieu.cheDoSuDung}</td>
                  {/* <td>{taiLieu.donViNopLuu}</td> */}
                  <td>{hoSo.trangThai}</td>
                  <td>{formatDate(taiLieu.ngayTao)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Không có tài liệu nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChiTietHoSoDaTrinhDuyet;
