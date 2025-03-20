import React from 'react'

const InputField = ({ label, name, value, onChange, disabled, type = 'text' }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>
      {label}:
    </label>
    <input type={type} className="form-control" name={name} value={value} onChange={onChange} disabled={disabled} />
  </div>
)

export default InputField
