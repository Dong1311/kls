import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import infoIcon from "../../assets/images/Function/info.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import RobotoFont from "../../assets/fonts/font-times-new-roman-base64"; 
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThongKeHSTL = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState({
    tongSoHoSo: 0,
    tongSoLuotKhaiThac: 0,
    tongSoMaHoSo: 0, // Thêm tổng mã hồ sơ
  });
  const tableRef = useRef(null); 
  const contentRef = useRef(null); // Tạo ref để trỏ đến nội dung
  const navigate = useNavigate(); // Hook điều hướng
  const barChartData = {
    labels: data.map((item) => item.tieuDeHoSo || "Không xác định"), // OX: Tên hồ sơ
    datasets: [
      {
        label: "Số lượt khai thác",
        data: data.map((item) => item.soLuotKhaiThac || 0), // OY: Số lượt khai thác
        backgroundColor: "#044D82", // Màu cột
        borderColor: "#044D82",
        borderWidth: 1,
        barThickness: 50, 
      },
    ],
  };
  
  // Cấu hình tùy chọn biểu đồ
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê số lượt khai thác theo hồ sơ",
      },
    },
    scales: {
      x: {
        ticks: {
          stepSize: 1, 
        },
        title: {
          display: true,
          text: "Tên hồ sơ",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượt khai thác",
        },
      },
    },
  };
  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams({
          startDate: startDate || "",
          endDate: endDate || "",
        }).toString();

        const response = await fetch(`/api/ctphieuyc/thong-ke-2?${query}`);
        const result = await response.json();

        setData(result.data || []);
        calculateSummary(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); 
        calculateSummary([]);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleExportPDF = async () => {
    const content = contentRef.current; 
  
    if (content) {
      try {
        // Chuyển nội dung thành hình ảnh
        const imgData = await domtoimage.toPng(content);
  
        // Tạo file PDF
        const pdf = new jsPDF("p", "mm", "a4");
  
        // Nhúng font hỗ trợ tiếng Việt
        pdf.addFileToVFS("Roboto-Regular-normal.ttf", RobotoFont);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
        pdf.setFont("Roboto");
  
        // Kích thước PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (pdfWidth * content.offsetHeight) / content.offsetWidth;
  
        // Thêm nội dung hình ảnh vào PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
        // Lưu file PDF
        pdf.save("ThongKeHSTL.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };
  
  

  // Tính toán tổng cộng
  const calculateSummary = (data) => {
    const tongSoHoSo = data.length;
    const tongSoLuotKhaiThac = data.reduce(
      (acc, item) => acc + (item.soLuotKhaiThac || 0),
      0
    );
    const tongSoMaHoSo = new Set(data.map((item) => item.maHoSo)).size; // Đếm mã hồ sơ duy nhất

    setSummary({ tongSoHoSo, tongSoLuotKhaiThac, tongSoMaHoSo });
  };

  // Hàm điều hướng khi chọn mục trong picklist
  const handlePicklistChange = (event) => {
    const value = event.target.value;
    if (value === "ThongKeHSTL") {
      navigate("/thong-ke-hstl");
    } else if (value === "ThongKePhieuYCKTSD") {
      navigate("/thong-ke-phieu-ycktsd");
    }
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center">
          <img src={infoIcon} alt="info" width="30" className="me-2" />
          Thống kê khai thác
        </h5>
        
        <button className="btn btn-primary" onClick={handleExportPDF}>Xuất biểu mẫu</button>
      </div>
      <div>
          <select
            className="form-select mt-4 mb-4"
            style={{
              width: "400px",
              fontSize: "18px", 
              fontWeight: "600", 
              color: "#043371",
            }}
            onChange={handlePicklistChange}
          >
            <option value="ThongKeHSTL">
              Thống kê HSTL đưa vào Phiếu YCKTSD
            </option>
            <option value="ThongKePhieuYCKTSD">
              Thống kê Phiếu YCKTSD
            </option>
          </select>
        </div>
      {/* Bộ lọc */}
      <div className="d-flex mb-4">
        <div className="me-3">
          <label htmlFor="startDate" className="form-label">
            Từ ngày:
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="form-label">
            Đến ngày:
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>


      <div ref={contentRef}>
        <div
          style={{
            backgroundColor: "#fff", // Nền trắng cho khung
            borderRadius: "10px", // Bo góc toàn khung
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Đổ bóng nhẹ
            marginTop: "20px", // Khoảng cách phía trên khung
          }}
        >
          {/* Tiêu đề */}
          <div
            style={{
              backgroundColor: "#044D82", // Màu nền tiêu đề
              padding: "10px",
              borderTopLeftRadius: "10px", // Bo góc phía trên bên trái
              borderTopRightRadius: "10px", // Bo góc phía trên bên phải
              color: "#fff", // Màu chữ
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Hiện trạng số hóa hồ sơ tài liệu
          </div>
  
          {/* Biểu đồ */}
          <div className="mt-3" style={{ height: "400px" }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
  
        <div
          style={{
            backgroundColor: "#fff", // Nền trắng cho khung
            borderRadius: "10px", // Bo góc toàn khung
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Đổ bóng nhẹ
            marginTop: "20px", // Khoảng cách phía trên khung
          }}
        >
          {/* Tiêu đề */}
          <div
            style={{
              backgroundColor: "#044D82", // Màu nền tiêu đề
              padding: "10px",
              borderTopLeftRadius: "10px", // Bo góc phía trên bên trái
              borderTopRightRadius: "10px", // Bo góc phía trên bên phải
              color: "#fff", // Màu chữ
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Thống kê tổng hợp
          </div>
          <div style={{ marginTop: "20px", padding:20}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                padding: "10px 20px",
                marginBottom: "10px",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>Tổng số hồ sơ:</span>
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>{summary.tongSoHoSo}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>Tổng số lượt khai thác:</span>
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>{summary.tongSoLuotKhaiThac}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ThongKeHSTL;
