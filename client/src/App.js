import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from "./components/ChatScreen"
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      currentScreen:"What is your usernamescreen",
      currentUsername:""
    }
    this.onUserNameSubmitted=this.onUserNameSubmitted.bind(this);
  }

  onUserNameSubmitted(username){
    fetch("http://localhost:8081/users",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({username})
    }).then(res=>{
      this.setState({
        currentUsername:username,
        currentScreen:"ChatScreen"
      })
    }).catch(err=>console.error(err));
  }

  render() {
    if(this.state.currentScreen==="What is your usernamescreen"){
      return (
        <UsernameForm onSubmit={this.onUserNameSubmitted}/>
      );
    }else if(this.state.currentScreen==="ChatScreen"){
      return (
        <ChatScreen currentUsername={this.state.currentUsername}/>
      );
    }
    
  }
}

export default App;
