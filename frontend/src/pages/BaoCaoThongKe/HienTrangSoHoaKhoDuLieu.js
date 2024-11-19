import React, { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import infoIcon from "../../assets/images/Function/info.png";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
import StatisticItem from "./StatisticItem";

const HienTrangSoHoaKhoDuLieu = () => {
  const [data, setData] = useState({
    tongSoHoSo: 0,
    soHoSoDaSoHoa: 0,
    soHoSoChuaSoHoa: 0,
    tongSoTaiLieu: 0,
    tongSoTrang: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref để truy cập phần tử HTML
  const contentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hoSoResponse = await fetch("/api/ho-so/summary");
        const hoSoData = await hoSoResponse.json();

        const taiLieuResponse = await fetch("/api/tai-lieu/summary");
        const taiLieuData = await taiLieuResponse.json();

        setData({
          tongSoHoSo: hoSoData.tongSoHoSo,
          soHoSoDaSoHoa: hoSoData.soHoSoDaSoHoa,
          soHoSoChuaSoHoa: hoSoData.soHoSoChuaSoHoa,
          tongSoTaiLieu: taiLieuData.tongSoTaiLieu,
          tongSoTrang: taiLieuData.tongSoTrang,
        });
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

  const handleExportPDF = async () => {
    const content = contentRef.current;

    if (content) {
      const canvas = await html2canvas(content, { scale: 2 }); // Chụp ảnh màn hình
      const imgData = canvas.toDataURL("image/png"); // Lấy ảnh dưới dạng base64
      const pdf = new jsPDF("p", "mm", "a4"); // Tạo tài liệu PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Thêm ảnh vào PDF
      pdf.save("HienTrangSoHoaKhoDuLieu.pdf"); // Lưu file
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
              <Doughnut data={chartData} />
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
  );
};

export default HienTrangSoHoaKhoDuLieu;
