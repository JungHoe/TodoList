import React from 'react';
import './Form.css';

const Form = ({ value, onChange, onCreate, onKeyPress, color }) => {
  return (
    <div className="form">
      <textarea
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        style={{ color }}
        placeholder="오늘 할일을 등록해 보세요 &#13;&#10;shift+enter 키로 다음줄을 작성할수 있습니다."
      />

      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;
