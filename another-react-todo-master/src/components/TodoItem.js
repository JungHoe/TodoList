import React, { Component } from 'react';

import './TodoItem.css';
import TextLine from './TextLine';
import Update from './UpdateForm';


class TodoItem extends Component {


  render() {
    const { text, checked, id, color, onToggle, onRemove, moment, updateYn, onUpdateSet, onUpdate} = this.props;
   
    return (
    
   
   
   
      <div className="todo-item"  >

        <div style={{ color }} className={'todo-text'}>
        
        <div className="checking" onClick={() => onToggle(id)}>
        {
          checked && (<div className="check-mark">&#x2713;</div>)
        }
        </div>
        <div className={`todo-text ${checked && 'checked'}`}>
        {' '}
        {updateYn === false ? (
          <TextLine text={text} color={color} />
        ) : (
          <Update
            ClassName=""
            text={text}
            color={color}
            ref={ref => {
              this.updateDom = ref;
            }}
          />
        )}
      </div>
          <div className='date'>{moment} 작성됨</div>
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
            onClick={e => {
              console.log(this.updateDom.state.updateText);
              console.log(id);
              
              onUpdate(id, this.updateDom.state.updateText);
            }}
          >
            완료
          </div>
        )}
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
       
      </div>

   
    );
  
  }
}

export default TodoItem;