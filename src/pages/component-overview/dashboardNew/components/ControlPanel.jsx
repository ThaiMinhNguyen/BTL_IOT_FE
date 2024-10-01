import React, { useState } from 'react';
import { Card, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan, faLightbulb, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import './ControlPanel.scss';

const ControlPanel = ({ onChange }) => {
  const [fanOn, setFanOn] = useState(true);
  const [acOn, setAcOn] = useState(true);
  const [lights, setLights] = useState([true]);
  const handleFanChange = (checked) => {
    setFanOn(checked);
    onChange(checked);
  };

  const handleAcChange = (checked) => {
    setAcOn(checked);
    onChange(checked);
  };

  const handleLightChange = (index, checked) => {
    const newLights = [...lights];
    newLights[index] = checked;
    setLights(newLights);
    onChange(checked);
  };

  return (
    <div className='listCard-button'>
      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon 
            icon={faFan} 
            className={`icon ${fanOn ? 'spinning fan-lit' : ''}`} 
          /> Quạt
        </div>
        <Switch defaultChecked onChange={handleFanChange} className='switch'/>
      </Card>
      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon 
            icon={faSnowflake} 
            className={`icon ${acOn ? 'cool' : ''}`} 
          /> Điều hòa
        </div>
        <Switch defaultChecked onChange={handleAcChange} className='switch'/>
      </Card>
      {lights.map((lightOn, index) => (
        <Card bordered={false} className='card-button' key={index}>
          <div>
            <FontAwesomeIcon 
              icon={faLightbulb} 
              className={`icon ${lightOn ? 'light-lit' : ''}`} 
            /> Đèn {index + 1}
          </div>
          <Switch 
            defaultChecked 
            onChange={(checked) => handleLightChange(index, checked)} 
            className='switch'
          />
        </Card>
      ))}
    </div>
  );
};

export default ControlPanel;
