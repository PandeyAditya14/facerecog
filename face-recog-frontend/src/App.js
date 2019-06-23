import React ,{ Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Signin from './components/Sigin/Signin';
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '45a3e5363bbc4ba78f8aa672e225149d',
  // clientId:'aditya141199@gmail.com',
  // clientSecret:'01fe17bcs014'
});


const parameters={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

const initstate ={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      loggedin: false,
      user:{
        name:'',
        id:'',
        email:'',
        enteries:0,
        date: ''
      }

    }

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      loggedin: false,
      user:{
        name:'',
        id:'',
        email:'',
        enteries:0,
        date: ''
      }

    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('here');
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }
  OnInputChange=(event)=>{
    
    this.setState({input: event.target.value});
  }

  OnRender = () =>{
    this.setState({
      imageURL : ''
    })
  }

  OnClick =()=>{
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => {
      fetch('https://pure-journey-58232.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(total => {
              this.setState(Object.assign(this.state.user, { enteries : total}))
            })     
      this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(err =>console.log(err)) ;
  }

  OnRouteChange = (route) => {
    if(route === 'home'){
      this.setState({loggedin:true})
      this.OnRender();

    }
    else{
      this.setState(initstate);
    }
    this.setState({route:route});
  }

  LoadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email:data.email,
      date:data.date,
      enteries:data.enteries,
    }});
    console.log(this.state.user);
  }

  render(){
    return (
      <div className="App">
        <div className='background'>
          <Particles classname='particle' params={parameters} />
        </div>
        
        <div className='content'>
          <Navigation OnRouteChange={this.OnRouteChange} loggedin={this.state.loggedin } />
          {
          this.state.route === 'home'
          ?<div>             
              <Logo /> 
              <Rank name={this.state.user.name}
                enteries={this.state.user.enteries}/>
              <ImageLinkForm OnRender={this.OnRender} OnInputChange ={this.OnInputChange} OnClick ={this.OnClick} />
              <FacialRecognition imageURL = {this.state.imageURL} box={this.state.box} />
              <div>{
                // this.setState({imageURL : ''})
              }</div>
            </div>
          : (
             this.state.route ==='signin' ? 
              <Signin LoadUser={this.LoadUser} OnRouteChange={this.OnRouteChange}/> 
             :
              <Register LoadUser={this.LoadUser} OnRouteChange ={this.OnRouteChange}/>
            
            )
          } 
        </div>
        
      </div>
    );
  } 
}
export default App;
