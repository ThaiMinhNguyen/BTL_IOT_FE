import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import Chart from './components/Chart'; // Import component Chart
import ControlPanel from './components/ControlPanel'; // Import component ControlPanel
import InfoCards from './components/InfoCards'; // Import component InfoCards
import "./dashboardNew.scss";

export default function DashboardNew() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateFakeData = () => {
      const now = new Date().toLocaleTimeString();
      const temperature = (Math.random() * 10 + 20).toFixed(2); // Nhiệt độ từ 20°C đến 30°C
      const humidity = (Math.random() * 30 + 50).toFixed(2);    // Độ ẩm từ 50% đến 80%
      const light = (Math.random() * 1000).toFixed(2);          // Ánh sáng từ 0 đến 1000 lux

      return { time: now, temperature, humidity, light };
    };

    const intervalId = setInterval(() => {
      setData(prevData => {
        const newDataPoint = generateFakeData();
        return [...prevData.slice(-59), newDataPoint]; // Giữ lại 60 điểm dữ liệu (5 phút)
      });
    }, 1000); // Cập nhật dữ liệu mỗi 1 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  const latestData = data[data.length - 1] || { temperature: 0, humidity: 0, light: 0 };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className='dashboardNew'>
      <InfoCards 
        temperature={latestData.temperature} 
        humidity={latestData.humidity} 
        light={latestData.light} 
      /> {/* Truyền dữ liệu vào InfoCards */}
      <Row gutter={20} className='chart-button'>
        <Col span={16}>
          <Card bordered={false} className="chart-container"> 
            <Chart data={data} /> {/* Sử dụng component Chart */}
          </Card>
        </Col>
        <Col span={8}>
          <ControlPanel onChange={onChange} /> {/* Sử dụng component ControlPanel */}
        </Col>
      </Row>
    </div>
  );
}
