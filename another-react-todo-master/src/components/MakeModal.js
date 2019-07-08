import React from 'react'
import Modal from 'react-modal';
import  './MakeModal.css';

export default class MakeModal extends React.Component{

    
    render(){
        const{modalIsOpen,closeModal,cancleModal}=this.props

        return(
            <div>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={cancleModal}
            contentLabel="Example Modal"
            className="Modal"
          >
  
            <h2 ref={subtitle => this.subtitle = subtitle}>정말 삭제하시겠습니까?</h2>
            <button onClick={closeModal}>삭제하기</button>
            <button onClick={cancleModal}>취소하기</button>
          </Modal>
            </div>
        )
    }
}