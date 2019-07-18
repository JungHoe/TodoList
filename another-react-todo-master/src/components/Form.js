import React from 'react';
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'



const Form = ({ value, onChange, onCreate, onKeyPress, color, onChangeImg, imgSrc }) => {

  const preview = () =>{
    if(imgSrc == ""){
      return(<div></div>)
    }else{
      return(
        <section>
          <img id="previewImg" src={imgSrc}></img>
        </section>
      )
    }

  }
 
  return (
    <div>
    <div className="form">
      <textarea value={value} onChange={onChange} onKeyPress={onKeyPress} style={{ color }} placeholder="오늘은 무엇을 해 볼 까요?" />
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
      <div className='button'>
        {/* <label htmlFor='single'>
          <FontAwesomeIcon icon={faImage} color='#3B5998' size='1x' />
        </label> */}
        <input type='file' id='single' onChange={onChangeImg}/> 
      </div>         
    </div>
    <br/>
      <preview></preview>
    </div>
  );
};

export default Form;
