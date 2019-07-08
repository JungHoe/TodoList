import React, { Component } from 'react';
import './UpdateForm.css';

class UpdateForm extends Component {
  componentDidMount() {
    this.focusText.focus();
  }

  state = {
    updateText: '',
    updateColor: this.props.color
  };

  updateText = e => {
    this.setState({
      updateText: e.target.value,
    });
  };

  updateColor = e => {
    this.setState({
      updateColor: e.target.id
    });
  };

  render() {
    const { text, colors} = this.props;
    console.log('state :' + this.state.updateColor);
    return (
      <div>
        <div className="form">
          <textarea
            style={{ color: this.state.updateColor }}
            className="textarea"
            onChange={this.updateText}
            ref={textarea => {
              this.focusText = textarea;
            }}
          >
            {text}
          </textarea>
        </div>
        <div className="colorWrappBox">
          {colors.map(color => {
            
            return <div className="colorBox" style={{ backgroundColor: color }} id={color} onClick={this.updateColor} />;
          })}
        </div>
      </div>
    );
  }
}

export default UpdateForm;
