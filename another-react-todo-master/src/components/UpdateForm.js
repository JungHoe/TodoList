import React, { Component } from 'react';
import './UpdateForm.css';

class UpdateForm extends Component {
  state = {
    updateText: '',
  };

  updateText = e => {
    this.setState({
      updateText: e.target.value,
    });
  };

  render() {
    const { text} = this.props;
    return (
      <div className="form">
        <textarea className="textarea" onChange={this.updateText}>
          {text}
        </textarea>
      </div>
    );
  }
}

export default UpdateForm;
