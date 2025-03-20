import React from 'react'

const SelectInput = ({ label, name, value, onChange, options = [], disabled }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>
      {label}:
    </label>
    <select
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled} // Thêm disabled ở đây
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export default SelectInput
