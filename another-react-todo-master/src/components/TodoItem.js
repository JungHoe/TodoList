import React, { Component } from 'react';

import './TodoItem.css';
import TextLine from './TextLine';
import Update from './UpdateForm';
import Modal from 'react-modal';

class TodoItem extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this); 
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

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
        <div className="remove" onClick={this.openModal}
        >&times;</div>
        <div>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>정말 삭제 하시겠습니까?</h2>
          <button onClick={(e)=>{
            e.stopPropagation();
            onRemove(id);
            this.closeModal();
          }}

          >Remove</button>
        </Modal>
      </div>
      </div>

   
    );
  
  }
}

export default TodoItem;