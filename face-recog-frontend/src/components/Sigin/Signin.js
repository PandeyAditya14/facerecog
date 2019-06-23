import React from  'react';
import './Sigin.css'

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signinemail:'',
            signinpassword:''
        };
    }

    OnEmailChange = (e) => {                                         // always use arrow function .. why? https://stackoverflow.com/questions/29577977/unable-to-access-react-instance-this-inside-event-handler
        // console.log(e.target.value);
        this.setState({signinemail: e.target.value });
        console.log(this.state.signinemail);
    }
    OnPasswordChange = (e) =>{
        this.setState({signinpassword : e.target.value });
    }
    OnSubmit = () =>{
        //console.log(this.state);
        fetch('https://pure-journey-58232.herokuapp.com/signin',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signinemail,
                password:this.state.signinpassword  
            })
        }).then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.id !== "") {
              this.props.LoadUser(user)
              this.props.OnRouteChange('home');
            }
            else{
                console.log('fail');
            }
          });
        
    }

    render(){
        const {OnRouteChange} = this.props ;
        return(
            <article id='card' className="br3 ba shadow-5 dark-gray b--black-10 mv4 w-250 w-50-m w-25-l mw7 center">
                <main className ="pa4 black-80 ">
                    <div className ="measure">
                        <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
                        <legend className ="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className ="mt3">
                            <label className ="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.OnEmailChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className ="mv3">
                            <label className ="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.OnPasswordChange} className ="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className ="">
                        <input className ="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.OnSubmit} />
                        </div>
                        <div className ="lh-copy mt3">
                        <p onClick={() => OnRouteChange('register')} className ="f6 link dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
            );

    }
}


export default Signin ;