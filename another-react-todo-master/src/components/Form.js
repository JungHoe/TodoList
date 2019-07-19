import React from 'react';
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'



const Form = ({ value, onChange, onCreate, onKeyPress, color, onChangeImg, imgSrc, imgOnClick }) => {

  const preview = () =>{
    if(imgSrc == ''){
      return(<div></div>)
    }else{
      return(
        <section>
          <img className="previewImg" src={imgSrc}></img>
        </section>
      )
    }
  };
 
  return (
    <div>
    <div className="form">

      <textarea value={value} onChange={onChange} onKeyPress={onKeyPress} style={{ color }} placeholder="오늘은 무엇을 해 볼 까요?" />
     
      <div className="create-button" onClick={onCreate}>
        추가
      </div>

      <div>
        <label htmlFor='single' className='inputBox'>
          <FontAwesomeIcon icon={faImage} color='#3B5998' size='3x' />
        </label>
        <input type='file' id='single' className='inputTag' onChange={onChangeImg}/> 
      </div>

    </div>

    <br/>

      {preview()}

    </div>
  );
};

export default Form;
