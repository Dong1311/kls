import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputField from '../../../components/InputField'
import addIcon from '../../../assets/images/Function/Add.png'
import editIcon from '../../../assets/images/Function/ChinhSua.png'
import deleteIcon from '../../../assets/images/Function/DeleteFile.png'
import { Link } from 'react-router-dom'

const ChiTietHoSoThuocKhoDuLieu = () => {
  const { id } = useParams()
  const [hoSo, setHoSo] = useState(null)
  const [taiLieuList, setTaiLieuList] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Lấy chi tiết hồ sơ từ backend
    fetch(`/api/ho-so/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu hồ sơ')
        }
        return response.json()
      })
      .then((data) => {
        setHoSo(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })

    // Lấy danh sách tài liệu
    fetch(`/api/ho-so/${id}/tai-lieu`)
      .then((response) => response.json())
      .then((data) => setTaiLieuList(data))
      .catch((error) => console.error('Lỗi khi lấy danh sách tài liệu:', error))
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setHoSo((prevHoSo) => ({
      ...prevHoSo,
      [name]: value,
    }))
  }

  const handleSave = () => {
    fetch(`/api/ho-so/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hoSo),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Cập nhật hồ sơ thất bại')
        return response.json()
      })
      .then((data) => {
        setHoSo(data)
        alert('Hồ sơ đã được lưu thành công.')
        navigate(-1)
      })
      .catch((error) => {
        console.error('Lỗi khi lưu hồ sơ:', error)
        setError('Lỗi khi lưu hồ sơ')
      })
  }

  const handleSubmitForReview = () => {
    const updatedHoSo = { ...hoSo, trangThai: 'Đã trình duyệt' }
    fetch(`/api/ho-so/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHoSo),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Trình duyệt hồ sơ thất bại')
        return response.json()
      })
      .then((data) => {
        setHoSo(data)
        alert('Hồ sơ đã được trình duyệt.')
        navigate(-1)
      })
      .catch((error) => {
        console.error('Lỗi khi trình duyệt hồ sơ:', error)
        setError('Lỗi khi trình duyệt hồ sơ')
      })
  }

  const handleDeleteTaiLieu = (taiLieuId) => {
    if (window.confirm('Bạn có chắc muốn xóa tài liệu này không?')) {
      fetch(`/api/ho-so/tai-lieu/${taiLieuId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Xóa tài liệu thất bại')
          }
          return response.json()
        })
        .then(() => {
          setTaiLieuList(taiLieuList.filter((taiLieu) => taiLieu.id !== taiLieuId))
        })
        .catch((error) => {
          console.error('Lỗi khi xóa tài liệu:', error)
        })
    }
  }

  const navigateToAddTaiLieu = () => {
    navigate(`/ho-so/${id}/add-tai-lieu`)
  }

  const navigateToChiTietTaiLieu = (taiLieuId) => {
    navigate(`/tai-lieu/${taiLieuId}`)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().split('T')[0]
  }

  if (loading) return <div>Đang tải dữ liệu...</div>
  if (error) return <div>Lỗi: {error}</div>
  if (!hoSo) return <div>Không tìm thấy hồ sơ</div>

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        <i className="bi bi-info-circle"></i> Chi tiết hồ sơ: {hoSo.tieuDeHoSo}
      </h5>

      <div className="row g-3 mb-4">
        {/* Các trường thông tin chi tiết hồ sơ */}
        <InputField
          label="Mã hồ sơ"
          name="maHoSo"
          value={hoSo.maHoSo}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Ký hiệu thông tin"
          name="kyHieuThongTin"
          value={hoSo.kyHieuThongTin}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Mã định danh cơ quan"
          name="maDinhDanhCoQuan"
          value={hoSo.maDinhDanhCoQuan}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField label="Người tạo" name="nguoiTao" value={hoSo.nguoiTao} disabled />
        <InputField
          label="Mục lục số/năm HS"
          name="mucLucSoNamHS"
          value={hoSo.mucLucSoNamHS}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Ngày tạo"
          name="ngayTao"
          type="date"
          value={hoSo.ngayTao ? new Date(hoSo.ngayTao).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Số và ký hiệu hồ sơ"
          name="soVaKyHieuHoSo"
          value={hoSo.soVaKyHieuHoSo}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Tổng số tài liệu"
          name="tongSoTaiLieu"
          value={hoSo.tongSoTaiLieu}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Tiêu đề hồ sơ"
          name="tieuDeHoSo"
          value={hoSo.tieuDeHoSo}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Tổng số trang"
          name="tongSoTrang"
          value={hoSo.tongSoTrang}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Chế độ sử dụng"
          name="cheDoSuDung"
          value={hoSo.cheDoSuDung}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Tình trạng vật lý"
          name="tinhTrangVatLy"
          value={hoSo.tinhTrangVatLy}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Thời gian bảo quản"
          name="thoiHanBaoQuan"
          value={hoSo.thoiHanBaoQuan}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Chú giải"
          name="chuGiai"
          value={hoSo.chuGiai}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />
        <InputField
          label="Đơn vị nộp lưu"
          name="donViNopLuu"
          value={hoSo.donViNopLuu}
          onChange={handleInputChange}
          disabled={hoSo.trangThai !== 'Tạo mới'}
        />

        {/* Ngày bắt đầu và kết thúc */}
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            className="form-control"
            name="thoiGianBatDau"
            value={hoSo.thoiGianBatDau ? new Date(hoSo.thoiGianBatDau).toISOString().split('T')[0] : ''}
            onChange={handleInputChange}
            disabled={hoSo.trangThai !== 'Tạo mới'}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center mb-3">
          <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>
            Ngày kết thúc:
          </label>
          <input
            type="date"
            className="form-control"
            name="thoiGianKetThuc"
            value={hoSo.thoiGianKetThuc ? new Date(hoSo.thoiGianKetThuc).toISOString().split('T')[0] : ''}
            onChange={handleInputChange}
            disabled={hoSo.trangThai !== 'Tạo mới'}
          />
        </div>

        {/* Trạng thái */}
        <InputField label="Trạng thái" value={hoSo.trangThai} disabled />
      </div>

      {/* Danh sách tài liệu */}
      <div style={{ background: '#D9D9D947', borderRadius: '10px', padding: '15px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Danh sách tài liệu</h6>
        </div>

        <table className="table table-striped mt-3">
          <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã tài liệu</th>
              <th scope="col">Tên tài liệu</th>
              <th scope="col">Nội dung tài liệu</th>
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
                    <Link to={`/chi-tiet-tai-lieu-thuoc-kho-du-lieu/${taiLieu.id}`}>TL000{taiLieu.id}</Link>
                  </td>
                  <td>
                    <a href={taiLieu.link} target="_blank" rel="noopener noreferrer" style={{ color: '#043371' }}>
                      Xem nội dung
                    </a>
                  </td>
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
  )
}

export default ChiTietHoSoThuocKhoDuLieu
