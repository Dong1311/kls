// InputField2.js
import React from 'react'

const InputField2 = ({ label, type = 'text', name, value, onChange, disabled = false }) => (
  <div className="col-md-6 d-flex align-items-center mb-3 text-start">
    <label className="form-label me-2" style={{ minWidth: '150px' }}>
      {label}
    </label>
    <input type={type} className="form-control" name={name} value={value} onChange={onChange} disabled={disabled} />
  </div>
)

export default InputField2
