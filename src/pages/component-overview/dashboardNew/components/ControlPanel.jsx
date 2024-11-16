import React, { useState, useEffect } from 'react';
import { Card, Switch, InputNumber, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan, faLightbulb, faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import './ControlPanel.scss';

const ControlPanel = ({ onChange }) => {
  const [isAutoMode, setIsAutoMode] = useState(true); // Chế độ tự động
  const [fanOn, setFanOn] = useState(false);
  const [lights, setLights] = useState([false]);
  const [doorClosed, setDoorClosed] = useState(false);
  const [lightTime, setLightTime] = useState(0);
  const [countdown, setCountdown] = useState(0); // Thời gian đếm ngược
  const [isCounting, setIsCounting] = useState(false); // Kiểm tra xem đồng hồ đếm ngược đang chạy hay không

  const handleModeChange = (checked) => {
    setIsAutoMode(checked);
    if (!checked) {
      // Reset thời gian đếm ngược khi chuyển sang chế độ thủ công
      setCountdown(0);
      setIsCounting(false);
    }
    onChange?.(checked);
  };

  const handleFanChange = (checked) => {
    setFanOn(checked);
    onChange?.(checked);
  };

  const handleLightChange = (index, checked) => {
    const newLights = [...lights];
    newLights[index] = checked;
    setLights(newLights);
    onChange?.(checked);
  };

  const handleDoorChange = (checked) => {
    setDoorClosed(!checked);
    onChange?.(!checked);
  };

  const handleSetTime = () => {
    if (lightTime > 0) {
      setCountdown(lightTime * 60); // Chuyển phút thành giây
      setIsCounting(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isCounting) {
      setIsCounting(false);
      // Reset đèn sau khi hết thời gian
      setLights([false]); // Tắt tất cả đèn (hoặc xử lý theo yêu cầu)
    }

    return () => clearInterval(timer);
  }, [countdown, isCounting]);

  return (
    <div className="control-panel">
      <Card bordered={false} className="card-button mode-switch">
        <div>Chế độ tự động</div>
        <Switch checked={isAutoMode} onChange={handleModeChange} className="switch" />
      </Card>

      {isAutoMode ? (
        // Chế độ tự động: nhập thời gian đèn sáng
        <Card bordered={false} className="card-button auto-mode">
          <div className="time-setting">
            <FontAwesomeIcon icon={faLightbulb} className="icon light-lit" />
            Thời gian đèn sáng (phút):
            <InputNumber
              min={1}
              value={lightTime}
              onChange={(value) => setLightTime(value)}
              className="input-number"
            />
            <Button
              type="primary"
              onClick={() => {
                if (lightTime > 0) {
                  setCountdown(lightTime * 60); // Reset thời gian đếm ngược
                  setIsCounting(true);
                }
              }}
              disabled={isCounting && lightTime * 60 === countdown} // Disable nếu thời gian không thay đổi
            >
              Set
            </Button>
          </div>

          {/* Hiển thị đồng hồ đếm ngược bên dưới khối nhập */}
          {isCounting && (
            <div className="countdown-timer">
              {`Thời gian còn lại: ${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}`}
            </div>
          )}
        </Card>
      ) : (
        // Chế độ thủ công: bật/tắt thiết bị
        <div className="manual-mode">
          <Card bordered={false} className="card-button">
            <div>
              <FontAwesomeIcon icon={faFan} className={`icon ${fanOn ? 'spinning fan-lit' : ''}`} />
              Quạt
            </div>
            <Switch checked={fanOn} onChange={handleFanChange} className="switch" />
          </Card>

          {lights.map((lightOn, index) => (
            <Card bordered={false} className="card-button" key={index}>
              <div>
                <FontAwesomeIcon icon={faLightbulb} className={`icon ${lightOn ? 'light-lit' : ''}`} />
                Đèn {index + 1}
              </div>
              <Switch
                checked={lightOn}
                onChange={(checked) => handleLightChange(index, checked)}
                className="switch"
              />
            </Card>
          ))}

          <Card bordered={false} className="card-button">
            <div>
              <FontAwesomeIcon
                icon={doorClosed ? faDoorClosed : faDoorOpen}
                className={`icon ${doorClosed ? 'door-closed' : 'door-open'}`}
              />
              {doorClosed ? 'Đóng cửa' : 'Mở cửa'}
            </div>
            <Switch checked={!doorClosed} onChange={handleDoorChange} className="switch" />
          </Card>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
