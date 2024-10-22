import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import logo from'../../assets/images/logo-bo-cong-an.jpg'

const Login = ({ onLogin }) => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token); 
          onLogin(); 
          navigate('/'); 
        } else {
          setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      })
      .catch(() => {
        setError('Có lỗi xảy ra. Vui lòng thử lại.');
      });
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow-lg login-card">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="login-logo mb-3" /> {/* Logo */}
          <h4>Đăng Nhập</h4>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>

          <div className="text-center mt-3">
            <a href="#" className="forgot-password-link">Quên mật khẩu?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
