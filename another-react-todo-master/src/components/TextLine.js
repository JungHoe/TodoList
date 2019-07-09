import React, { Component } from 'react';
import './TextLine.css';
import OpengraphReactComponent from './OpengraphReactComponent';

class TextLine extends Component {
  render() {
    const { text, color } = this.props;
    const opengraph = [];
    let txt = text;
    let regUrl2 = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    return (
      <div className={TextLine} style={{ color: color }}>
        {/* 1차적으로 줄바꿈을 기준으로 나눈다. */}
        {txt.split('\n').map(line => {
          return (
            <div>
              {/* 2차로 한줄에 있는 텍스트를 정규식을 기준으로 나눠서 각각 처리한다. */}
              {line.split(' ').map(url => {
                if (url.match(regUrl2)) {
                  if (opengraph.length < 1) {
                    opengraph.push({ url: url });
                  }
                  return (
                    <a href={url} target="_blank" style={{ color: color }}>
                      {url}
                    </a>
                  );
                } else {
                  return ' ' + url;
                }
              })}
              <br />
            </div>
          );
        })}
        <div>
          {opengraph.map(meta => {
            return <OpengraphReactComponent site={meta.url} />;
          })}
        </div>
      </div>
    );
  }
}

export default TextLine;
