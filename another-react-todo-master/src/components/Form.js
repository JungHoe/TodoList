import React from 'react';
import './Form.css';

const Form = ({ value, onChange, onCreate, onKeyPress, color }) => {
  return (
    <div className="form">
      <textarea value={value} onChange={onChange} onKeyPress={onKeyPress} style={{ color }} placeholder="오늘은 무엇을 해 볼 까요?" />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;
