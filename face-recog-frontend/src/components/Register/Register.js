import React from  'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            email:'',
            password:'',
            name:''
        }
    }

    OnPasswordChange =(e) =>{
        this.setState({password:e.target.value})
    }
    
    OnEmailChange =(e) =>{
        this.setState({email:e.target.value})
    }

    OnNameChange =(e) =>{
        this.setState({name:e.target.value})
    }

    OnRegister=()=>{
        fetch('https://pure-journey-58232.herokuapp.com/register',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name
            })
        }).then(response => response.json())
          .then(user => {
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
        return(
            <article id='card' className="br3 ba shadow-5 dark-gray b--black-10 mv4 w-250 w-50-m w-25-l mw7 center">
                <main className ="pa4 black-80 ">
                    <div className ="measure">
                        <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
                        <legend className ="f2 fw6 ph0 mh0">Register</legend>
                        <div className ="mt3">
                            <label className ="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.OnEmailChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className ="mt3">
                            <label className ="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.OnNameChange} className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-99" type="name" name="name"  id="name"/>
                        </div>
                        <div className ="mv3">
                            <label className ="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.OnPasswordChange} className ="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className ="">
                        <input className ="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.OnRegister} />
                        </div>
                   </div>
                </main>
            </article>
            );

    }
}

export default Register ;