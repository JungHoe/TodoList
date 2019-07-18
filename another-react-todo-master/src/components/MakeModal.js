import React from 'react';
import Modal from 'react-modal';
import './MakeModal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgb(180, 180, 180)',
  },
};

export default class MakeModal extends React.Component {
  render() {
    const { modalIsOpen, closeModal, cancleModal } = this.props;

    return (
      <Modal isOpen={modalIsOpen} onRequestClose={cancleModal} contentLabel="Example Modal" style={customStyles}>
        <h2 ref={subtitle => (this.subtitle = subtitle)}>삭제하시겠습니까?</h2>
        <div className="btnGroup">
          <button onClick={closeModal} className="deleteBtn">
            삭제
          </button>
          <button onClick={cancleModal} className="cancleBtn">
            취소
          </button>
        </div>
      </Modal>
    );
  }
}
