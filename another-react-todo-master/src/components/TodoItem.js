import React, { Component } from 'react';

import './TodoItem.css';
import TextLine from './TextLine';
import Update from './UpdateForm';
import restUpdate from './UpdateRestComponent';
class TodoItem extends Component {
  render() {
    const { text, checked, id, color, colors, onToggle, openModal, moment, updateYn, onUpdateSet, onUpdate } = this.props;

    return (
      <div className="todo-item">
        <div style={{ color }} className={'todo-text'}>
          <div className="checking" onClick={() => onToggle(id)}>
            {checked && <div className="check-mark">&#x2713;</div>}
          </div>
          <div className={`todo-text`}>
            {updateYn === false ? (
              <TextLine text={text} color={color} checked={checked} />
            ) : (
              <div>
                <Update
                  text={text}
                  color={color}
                  colors={colors}
                  ref={ref => {
                    this.updateDom = ref;
                  }}
                />
              </div>
            )}
          </div>
          <div className="date">{moment} 작성됨</div>
        </div>
        {updateYn === false ? (
          <div
            className="update"
            onClick={() => {
              onUpdateSet(id);
            }}
          >
            수정
          
          </div>
        ) : (
          <div
            className="update"
            onClick={() => {
              onUpdate(id, this.updateDom.state.updateText, this.updateDom.state.updateColor);
              restUpdate(id, this.updateDom.state.updateText, this.updateDom.state.updateColor);
    
            }}
            
          >
            완료
            
          </div>
        )}

        <div className="remove" onClick={() => openModal(id)}>
          &times;
        </div>
        <div />
      </div>
    );
  }
}

export default TodoItem;
