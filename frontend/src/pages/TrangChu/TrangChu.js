import React, { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import jsPDF from "jspdf";
import { Bar } from "react-chartjs-2";
import infoIcon from "../../assets/images/Function/info.png";
import domtoimage from "dom-to-image";
import RobotoFont from "../../assets/fonts/font-times-new-roman-base64"; 

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale, // Đăng ký LinearScale
  CategoryScale, // Đăng ký CategoryScale cho trục danh mục
  BarElement, // Đăng ký BarElement cho biểu đồ cột
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);

ChartJS.register(ArcElement, Tooltip, Legend);
import StatisticItem from "./StatisticItem";

const TrangChu = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    tongSoHoSo: 0,
    soHoSoDaSoHoa: 0,
    soHoSoChuaSoHoa: 0,
    tongSoTaiLieu: 0,
    tongSoTrang: 0,
    trangThaiHoSo: [], // Giá trị mặc định là mảng rỗng
  });
  const [hoSoChuaSoHoaData, setHoSoChuaSoHoaData] = useState([]);
  const [hoSoDaSoHoaData, setHoSoDaSoHoaData] = useState([]);

  const trangThaiChuaSoHoa = [
    "Đã trình duyệt lưu kho",
    "BMCL",
    "Đã nhận NLLS",
    "Cần thu thập lại",
    "Từ chối NLLS",
    "Đã trình duyệt NLLS",
    "Từ chối nộp lưu",
    "Đã trình duyệt",
    "Tạo mới",
  ];
  
  const trangThaiDaSoHoa = [
    "Đã duyệt QĐTH",
    "Từ chối QĐTH",
    "Chờ duyệt QĐTH",
    "Đóng băng",
    "Chờ QĐTH",
    "Đã nhận lưu kho",
  ];
  
  
  const contentRef = useRef();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const hoSoResponse = await fetch("/api/ho-so/summary");
        const hoSoData = await hoSoResponse.json();
  
        const trangThaiResponse = await fetch("/api/ho-so/trang-thai");
        const trangThaiData = await trangThaiResponse.json();
  
        const taiLieuResponse = await fetch("/api/tai-lieu/summary");
        const taiLieuData = await taiLieuResponse.json();
  
        // Tính toán dữ liệu cho hồ sơ chưa số hóa
        const hoSoChuaSoHoa = trangThaiChuaSoHoa.map(trangThai => {
          const matched = trangThaiData.find(item => item.trangThai === trangThai);
          return matched ? matched.soLuong : 0; // Giá trị là 0 nếu không có dữ liệu
        });
  
        // Tính toán dữ liệu cho hồ sơ đã số hóa
        const hoSoDaSoHoa = trangThaiDaSoHoa.map(trangThai => {
          const matched = trangThaiData.find(item => item.trangThai === trangThai);
          return matched ? matched.soLuong : 0; // Giá trị là 0 nếu không có dữ liệu
        });
  
        // Cập nhật state
        setHoSoChuaSoHoaData(hoSoChuaSoHoa);
        setHoSoDaSoHoaData(hoSoDaSoHoa);
  
        setData(prevData => ({
          ...prevData,
          tongSoHoSo: hoSoData.tongSoHoSo,
          soHoSoDaSoHoa: hoSoData.soHoSoDaSoHoa,
          soHoSoChuaSoHoa: hoSoData.soHoSoChuaSoHoa,
          trangThaiHoSo: trangThaiData,
          tongSoTaiLieu: taiLieuData.tongSoTaiLieu,
          tongSoTrang: taiLieuData.tongSoTrang,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const chartData = {
    labels: [
      `Hồ sơ đã số hóa (${data.soHoSoDaSoHoa})`,
      `Hồ sơ chưa số hóa (${data.soHoSoChuaSoHoa})`,
    ],
    datasets: [
      {
        data: [data.soHoSoDaSoHoa, data.soHoSoChuaSoHoa],
        backgroundColor: ["#0063ba", "#ccc"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handleExportPDF = async () => {
    const content = contentRef.current;
  
    if (content) {
      try {
        // Chụp nội dung bằng domtoimage
        const canvas = await domtoimage.toPng(content);
  
        // Khởi tạo file PDF
        const pdf = new jsPDF("p", "mm", "a4");
  
        // Kích thước PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = (pdfWidth * content.offsetHeight) / content.offsetWidth;
  
        pdf.addFileToVFS("Roboto-Regular-normal.ttf", RobotoFont);
        pdf.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
        pdf.setFont("Roboto");
        // Thêm tiêu đề "Hiện trạng số hóa" căn giữa
        const title = "Hiện trạng số hóa";
        pdf.setFontSize(20);
        pdf.text(title, pdfWidth / 2, 20, { align: "center" });
  
        // Khoảng cách từ tiêu đề đến bảng
        const topMargin = 30;
  
        // Thêm hình ảnh bảng vào PDF
        pdf.addImage(canvas, "PNG", 0, topMargin, pdfWidth, contentHeight);
  
        // Lưu file PDF
        pdf.save("HienTrangSoHoaKhoDuLieu.pdf");
      } catch (error) {
        console.error("Error generating PDF with domtoimage:", error);
      }
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="d-flex align-items-center">
            <img src={infoIcon} alt="add" width="30" className="me-2" />
            Hiện trạng số hóa hồ sơ tài liệu
          </h5>
        </div>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#0063ba",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleExportPDF} // Gọi hàm xuất PDF
        >
          Xuất biểu mẫu
        </button>
      </div>

      {/* Nội dung */}
      <div ref={contentRef}>
        <div >
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            {/* Hình chữ nhật bên trái */}
            <div
              style={{
                flex: 1,
                maxWidth: "50%",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundColor: "#044D82",
                  padding: "10px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hiện trạng số hóa hồ sơ tài liệu
              </div>
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                <Doughnut 
                  data={chartData} 
                  options={chartOptions} 
                  width={400} // Đặt chiều rộng biểu đồ
                  height={400} // Đặt chiều cao biểu đồ
                />
              </div>
            </div>
  
            {/* Hình chữ nhật bên phải */}
            <div
              style={{
                flex: 1,
                maxWidth: "48%",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundColor: "#044D82",
                  padding: "10px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Thống kê số hóa hồ sơ tài liệu
              </div>
              <div
                style={{
                  padding: "20px",
                  flexGrow: 1,
                }}
              >
                <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                  <StatisticItem label="Tổng số hồ sơ:" value={data.tongSoHoSo} />
                  <StatisticItem
                    label="Tổng số tài liệu:"
                    value={data.tongSoTaiLieu}
                  />
                  <StatisticItem
                    label="Số hồ sơ đã số hóa:"
                    value={data.soHoSoDaSoHoa}
                  />
                  <StatisticItem
                    label="Số hồ sơ chưa số hóa:"
                    value={data.soHoSoChuaSoHoa}
                  />
                  <StatisticItem
                    label="Tổng số trang:"
                    value={data.tongSoTrang}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default TrangChu;
