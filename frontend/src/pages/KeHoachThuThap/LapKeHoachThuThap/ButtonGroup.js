import React from 'react'
import CustomPopup from '../../../components/CustomPopUp'

const ButtonGroup = ({ onSave, onSubmit, onClose, disabled }) => (
  <div className="d-flex justify-content-end mb-4">
    <CustomPopup
      disabled={disabled}
      className="btn btn-warning mx-2 flex-grow-1"
      style={{ maxWidth: '150px' }}
      title="Trình duyệt"
      text="Đồng chí có chắc muốn trình duyệt kế hoạch này không?"
      onConfirm={onSubmit}
    />
    <CustomPopup
      disabled={disabled}
      className="btn btn-primary mx-2 flex-grow-1"
      style={{ maxWidth: '150px', backgroundColor: '#2289E7' }}
      title="Lưu"
      text="Đồng chí có chắc muốn lưu kế hoạch này không?"
      onConfirm={onSave}
    />
    <CustomPopup
      className="btn btn-secondary mx-2 flex-grow-1"
      style={{ maxWidth: '150px' }}
      title="Đóng"
      text="Đồng chí có chắc muốn hủy thao tác và đóng không?"
      onConfirm={onClose}
    />
  </div>
)

export default ButtonGroup
