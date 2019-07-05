import React from 'react';
import './Palette.css';

const Color = ({ color, active, onClick }) => {
  return <div className={`color ${active && 'active'}`} style={{ background: color }} onClick={onClick} />;
};

const Palette = ({ colors, selected, onSelect }) => {
  const colorList = colors.map(color => <Color color={color} active={selected === color} onClick={() => onSelect(color)} key={color} />);
  return (
    <div>
      <div className="palette">{colorList}</div>
      <div style={{ height: '20px' }}>
        <span className="test1">Unimportant</span>
        <span className="test2">Important</span>
      </div>
    </div>
  );
};

export default Palette;
