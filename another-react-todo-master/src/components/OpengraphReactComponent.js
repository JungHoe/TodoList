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
    const { title, image, description } = this.state;

    let leg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    let aTag = null;

    // a Tag 조건부 렌더링 (http(s) or wwww)
    if (site.match(leg)) {
      aTag = (
        <a href={site} target="_blank">
          {title}
        </a>
      );
    } else {
      aTag = (
        <a href={'//' + site} target="_blank">
          {title}
        </a>
      );
    }

    return (
      <div>
        <div className="OpenBox">
          <div>
            <img className="Image" src={image} />
          </div>
          <div className="TextBox">
            <div className="Title">{aTag}</div>
            <br />
            <span>{description}</span>
          </div>
        </div>
      </div>
    );
  }
}
