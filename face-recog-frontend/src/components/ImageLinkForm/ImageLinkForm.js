import React from 'react';
import './ilf.css';

function ImageLinkForm({OnRender ,OnInputChange , OnClick}){
    return(
        <div>
            <p className ='f3'>
                {'Enter URL with correct formating ....... and will locate the face'}
            </p>
            <div className = 'center'>
                <div className='center form pa4 br3 shadow-5'>               
                    <input className='f4 pa2 w-70' type = 'text' onChange ={OnInputChange}  />
                    <button className='btsize center grow bg-light-purple f4 link ph3 pv2 dib white ' onClick = {OnClick}  >Submit</button> 
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;