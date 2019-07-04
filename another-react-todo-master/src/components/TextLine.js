import React, { Component } from 'react';
import './TextLine.css';
import OpengraphReactComponent from './OpengraphReactComponent';

class TextLine extends Component {
  render() {
    const { text, color } = this.props;
    const opengraph = [];
    let txt = text;
    let regUrl = /(www\.[\S]+(\b|$))/;
    return (
      <div className={TextLine} style={{ color: color }}>
        {/* 1차적으로 줄바꿈을 기준으로 나눈다. */}
        {txt.split('\n').map(line => {
          return (
            <div>
              {/* 2차로 한줄에 있는 텍스트를 정규식을 기준으로 나눠서 각각 처리한다. */}
              {line.split(regUrl).map(url => {
                if (url.match(regUrl)) {
                  opengraph.push({ url: url });
                  return (
                    <div>
                      <a href={'//' + url} target="_blank">
                        {url}
                      </a>
                      <OpengraphReactComponent site={url} appId={'0d6683d8-187d-4aa9-a1fb-b43260b087a4'} size={'small'} />
                    </div>
                  );
                } else {
                  return url;
                }
              })}
              <br />
            </div>
          );
        })}
        <div>
          {opengraph.map(metaUrl => {
            <OpengraphReactComponent site={metaUrl} appId={'0d6683d8-187d-4aa9-a1fb-b43260b087a4'} size={'small'} />;
          })}
        </div>
      </div>
    );
  }
}

export default TextLine;
