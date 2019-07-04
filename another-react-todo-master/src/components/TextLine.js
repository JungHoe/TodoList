import React, { Component } from 'react';

class TextLine extends Component {
  render() {
    const { text, color } = this.props;
    let txt = text;
    let regUrl = /(www\.[\S]+(\b|$))/;
    return (
      <div style={{ color: color }}>
        {/* 1차적으로 줄바꿈을 기준으로 나눈다. */}
        {txt.split('\n').map(line => {
         
          return (
            <span>
              {/* 2차로 한줄에 있는 텍스트를 정규식을 기준으로 나눠서 각각 처리한다. */}
              {line.split(regUrl).map(url => {
                if (url.match(regUrl)) {
                  return (
                    <a href={'//' + url} target="_blank">
                      {url}
                    </a>
                  );
                } else {
                  return url;
                }
              })}
              <br />
            </span>
          );
        })}
      </div>
    );
  }
}

export default TextLine;
