import React from 'react'

const TextInput = ({ label, name, value, onChange, disabled = false }) => (
  <div className="col-md-6 d-flex align-items-center mb-3">
    <label className="form-label me-2 text-start" style={{ minWidth: '180px' }}>
      {label}:
    </label>
    <input type="text" className="form-control" name={name} value={value} onChange={onChange} disabled={disabled} />
  </div>
)

export default TextInput
