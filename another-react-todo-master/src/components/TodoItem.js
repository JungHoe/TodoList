import React, { Component } from 'react';

import './TodoItem.css';
import TextLine from './TextLine';
import Update from './UpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

const editIcon = <FontAwesomeIcon icon={faEdit} color="#22b8cf" />;
const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} color="#ff6666" />;
const doneIcon = <FontAwesomeIcon icon={faCheck} color="#00ff00" />;

class TodoItem extends Component {
  render() {
    const { text, checked, id, color, colors, onToggle, openModal, moment, updateYn, onUpdateSet, onUpdate } = this.props;

    return (
      <div className="todo-item">
        <div className="checking" onClick={() => onToggle(id)}>
          {checked && <div className="check-mark">&#x2713;</div>}
        </div>
        <div style={{ color }} className={'todo-text'}>
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
            {editIcon}
          </div>
        ) : (
          <div
            className="update"
            onClick={() => {
              onUpdate(id, this.updateDom.state.updateText, this.updateDom.state.updateColor);
            }}
          >
            {doneIcon}
          </div>
        )}

        <div className="remove" onClick={() => openModal(id)}>
          {deleteIcon}
        </div>
        <div />
      </div>
    );
  }
}

export default TodoItem;
