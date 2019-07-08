import React, { Component } from 'react';
import './OpengraphReactComponent.css';
import axios from 'axios';
export default class OpengraphReactComponent extends Component {
  state = {
    title: null,
    image: null,
    description: null,
  };

  componentDidMount(props) {
    let originUrl = this.props.site;
    let result = originUrl.replace(/.*?:\/\//g, '');

    axios.get('http://localhost:8080/hello?url=' + result).then(response => {
      this.setState({
        title: response.data.title,
        image: response.data.image,
        description: response.data.description,
      });
    });
  }

  render() {
    const { site } = this.props;
    const { getOpengraph } = this;
    const { title, image, description } = this.state;

    return (
      <div>
        <div className="OpenBox">
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
            <span>{description}</span>
          </div>
        </div>
      </div>
    );
  }
}
