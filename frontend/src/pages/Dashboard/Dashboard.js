import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'
import { ProgressBar } from 'react-bootstrap'

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Hiện trạng số hóa hồ sơ tài liệu</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div className="progress-circle">
                  <ProgressBar
                    now={63}
                    variant="primary"
                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                  />
                </div>
                <div>
                  <p>Hồ sơ đã số hóa: 12</p>
                  <p>Hồ sơ chưa số hóa: 7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thống kê số hóa hồ sơ tài liệu</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Tổng số hồ sơ: 19</li>
                <li className="list-group-item">Tổng số tài liệu: 35</li>
                <li className="list-group-item">Số hồ sơ đã số hóa: 12</li>
                <li className="list-group-item">Số hồ sơ chưa số hóa: 7</li>
                <li className="list-group-item">Tổng số tờ: 200</li>
                <li className="list-group-item">Tổng số trang: 399</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
