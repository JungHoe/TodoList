import React from 'react';
import './Form.css';
import File from './File'

const Form = ({ value, onChange, onCreate, onKeyPress, color,onDrop }) => {
  return (
    <div className="form">
      <div className="firstWrap">
      <textarea value={value} onChange={onChange} onKeyPress={onKeyPress} style={{ color }} placeholder="오늘은 무엇을 해 볼 까요?" />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
      </div>
      <div className="secondWrap">
      {<File onDrop={onDrop}></File>}
      </div>
     </div>
    
  );
};

export default Form;
