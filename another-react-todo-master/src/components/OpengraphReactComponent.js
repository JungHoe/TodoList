import React, { Component } from 'react';
import './OpengraphReactComponent.css';
import axios from 'axios';
import Dotdotdot from 'react-dotdotdot'
export default class OpengraphReactComponent extends Component {
  state = {
    title: null,
    
    image: null,
    description: null,
  };
  handleClick = ()=>{
    window.open("https://"+this.props.site)
    }
  componentDidMount(props) {
    let originUrl = this.props.site;
    let result = originUrl.replace(/.*?:\/\//g, '');

    axios.get('http://localhost:8080/metadata?url=' + result).then(response => {
      this.setState({
        title: response.data.title,
        image: response.data.image,
        description: response.data.description,
      });
    });
  }

  render() {
    const { site } = this.props;
    const { title, image, description } = this.state;

    return (
      <div>
      <div className="OpenBox" onClick={this.handleClick}>
          <div>
          
              <img className="Image" src={image} />
           
          </div>
          <div className="TextBox">
            <div className="Title">
              <a href={'//' + site} target="_blank">
                {title}
              </a>
            </div>
            <br />
            <Dotdotdot clamp={4}>
            {description}
            </Dotdotdot>
          </div>
        </div>
      </div>
    );
  }
}
