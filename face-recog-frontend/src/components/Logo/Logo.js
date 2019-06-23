import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain2.png';
import './Logo.css';

function Logo(){
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop: '5px'}}src={brain} alt='LOGO'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;