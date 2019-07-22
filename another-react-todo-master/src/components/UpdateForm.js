import React, { Component } from 'react';
import './UpdateForm.css';

class UpdateForm extends Component {
  componentDidMount() {
    this.focusText.focus();
  }

  //updateImg=주소 imge=파일
  state = {
    updateText: this.props.text,
    updateColor: this.props.color,
    updateImg: this.props.image,
    image: '',
  };

  updateText = e => {
    this.setState({
      updateText: e.target.value,
    });
  };

  updateColor = e => {
    this.setState({
      updateColor: e.target.id,
    });
  };
  updateImage = e => {
    this.setState({
      image: e.target.files
    });

    let file = e.target.files[0]
    let reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({
        updateImg: reader.result
      })
    }
    console.log(this.state.updateImg);
  }

  deleteImage = () => {
    this.setState({
      image: null,
      updateImg: null
    })
  }

  render() {
    const { colors } = this.props;
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
              value={this.state.updateText}
            />
            
          </div>
          <div className="colorWrappBox">
            {colors.map(color => {
              return <div className="colorBox" style={{ backgroundColor: color }} id={color} onClick={this.updateColor} />;
            })}
            {this.state.updateImg === null ?(
                <div>   
                <input type='file'  onChange={this.updateImage}/>       
                </div>
            ) : (
              <div>
              <img src={this.state.updateImg} />
              <input type='file'  onChange={this.updateImage}/>  
              <button onClick={this.deleteImage}>이미지삭제</button>
            </div>
            )
            }
          </div>
        </div>
    );
  }
}

export default UpdateForm;