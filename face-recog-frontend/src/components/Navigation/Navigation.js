import React from 'react'

function Navigation({ OnRouteChange , loggedin }){
    if(loggedin){
        return (
            <nav style = {{display:'flex' , justifyContent: 'flex-end'}}>
                <p className ='f3 link dim black underline pa3 pointer ' onClick={()=>OnRouteChange('signin')} >Sign Out</p>
            </nav>
        );
    }
    else{
        return (
            <nav style = {{display:'flex' , justifyContent: 'flex-end'}}>
                <p className ='f3 link dim black underline pa3 pointer ' onClick={()=>OnRouteChange('signin')} >Sign In</p>
                <p className ='f3 link dim black underline pa3 pointer ' onClick={()=>OnRouteChange('register')} >Register</p>
            </nav>
        );

    }
    
}

export default Navigation;