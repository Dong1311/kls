import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import addIcon from '../../../assets/images/Function/Add.png'
import deleteIcon from '../../../assets/images/Function/DeleteFile.png'
import editIcon from '../../../assets/images/Function/ChinhSua.png'
import infoIcon from '../../../assets/images/Function/info.png'
import 'bootstrap/dist/css/bootstrap.min.css'

const DanhSachBienMucHoSo = () => {
  const [hoSoList, setHoSoList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const fetchHoSos = () => {
    fetch(`/api/ho-so?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredHoSoList = data.filter(
          (hoSo) =>
            hoSo.trangThai === 'Từ chối lưu kho' ||
            hoSo.trangThai === 'Biên mục chỉnh lý' ||
            (hoSo.trangThai === 'Đã nhận NLLS' && hoSo.bienBanBanGiaoId !== null)
        )
        setHoSoList(filteredHoSoList)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }

  useEffect(() => {
    fetchHoSos()
  }, [searchTerm])

  const handleEditHoSo = (hoSoId) => {
    navigate(`/bien-muc-ho-so/${hoSoId}`)
  }

  const handleDeleteHoSo = (hoSoId) => {
    if (window.confirm('Bạn có chắc muốn xóa hồ sơ này không?')) {
      fetch(`/api/ho-so/${hoSoId}`, { method: 'DELETE' })
        .then(() => {
          setHoSoList(hoSoList.filter((hoSo) => hoSo.id !== hoSoId))
        })
        .catch((error) => console.error('Lỗi khi xóa hồ sơ:', error))
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="info" width="30" className="me-2" />
          Quản lý Biên mục Hồ sơ
        </h5>
      </div>

      <h6 className="text-start mb-3">Danh sách Biên mục Hồ sơ</h6>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm kiếm..."
            style={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn btn-light" onClick={() => navigate('/bien-muc-ho-so/add')}>
          <img src={addIcon} alt="add" width="20" />
        </button>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead style={{ backgroundColor: '#2289E7', color: '#fff' }}>
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">STT</th>
            <th scope="col">Mã hồ sơ</th>
            <th scope="col">Tiêu đề hồ sơ</th>
            <th scope="col">Tên kế hoạch</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Số lượng tài liệu</th>
            <th scope="col">Trạng thái</th>
            <th style={{ minWidth: '120px' }} scope="col">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {hoSoList.map((hoSo, index) => (
            <tr key={hoSo.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{hoSo.maHoSo}</td>
              <td>
                <Link to={`/bien-muc-ho-so/${hoSo.id}`} style={{ color: '#043371' }}>
                  {hoSo.tieuDeHoSo}
                </Link>
              </td>
              <td>{hoSo.keHoachThuThap ? hoSo.keHoachThuThap.tieuDe : 'N/A'}</td> <td>{hoSo.nguoiTao}</td>
              <td>{new Date(hoSo.ngayTao).toLocaleDateString()}</td>
              <td>{hoSo.tongSoTaiLieu}</td>
              <td>
                <span style={getTrangThaiStyle(hoSo.trangThai)}>{hoSo.trangThai}</span>
              </td>
              <td>
                <button
                  className="btn btn-light me-2"
                  onClick={() => handleEditHoSo(hoSo.id)}
                  disabled={hoSo.trangThai === 'Đã nhận lưu kho'}
                >
                  <img src={editIcon} alt="edit" width="20" />
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => handleDeleteHoSo(hoSo.id)}
                  disabled={hoSo.trangThai === 'Đã nhận lưu kho'}
                >
                  <img src={deleteIcon} alt="delete" width="20" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const getTrangThaiStyle = (trangThai) => {
  let backgroundColor = ''
  let color = '#fff'
  switch (trangThai) {
    case 'Biên mục chỉnh lý':
      backgroundColor = '#2289E7'
      break
    case 'Đã nhận NLLS':
      backgroundColor = '#ffc107'
      break
    case 'Đã nhận lưu kho':
      backgroundColor = '#28a745'
      break
    case 'Từ chối lưu kho':
      backgroundColor = '#dc3545'
      break
    default:
      backgroundColor = '#6c757d'
      break
  }

  return {
    backgroundColor,
    color,
    padding: '5px 10px',
    borderRadius: '8px',
    display: 'inline-block',
    fontWeight: '400',
    fontSize: '14px',
    minWidth: '140px',
    textAlign: 'center',
  }
}

export default DanhSachBienMucHoSo
