import React from 'react';
import ImageUploader from 'react-images-upload'
import './File.css'

const file = ({onDrop}) => {
    return (
        <ImageUploader 
            withIcon={true}
            buttonText='Choose'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png',]}
            maxFileSize={5242880}
            withPreview={true}
            label={'Max file size: 5mb, accepted: jpg gif png'}
            className="preViewer"
            singleImage={true}
        >
        </ImageUploader>

    );
};

export default file;


