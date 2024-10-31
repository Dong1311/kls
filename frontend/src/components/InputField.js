const InputField = ({ label, value, disabled }) => (
    <div className="col-md-6 d-flex align-items-center mb-3">
      <label className="form-label 4 me-2 text-start" style={{ minWidth: '180px' }}>
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        value={value}
        disabled={disabled}
      />
    </div>
  );
export default InputField;