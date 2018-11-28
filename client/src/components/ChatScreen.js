import React,{Component} from "react";
import Chatkit from "@pusher/chatkit";

export default class ChatScreen extends Component{
    componentDidMount(){
        const chatManager= new Chatkit.ChatManager({
          //instanceLocator:"",
          instanceLocator:"v1:us1:18cb772d-90d4-4398-99af-e14a882d4e51",
          userId:this.props.currentUsername,
          tokenProvider:new Chatkit.TokenProvider({
            url:"http://localhost:8081/authenticate"
          }) 
        });
        console.log(chatManager.connect())
        chatManager.connect().then((currentUser)=>{debugger; 
          console.log("current User",currentUser)})
        .catch((error)=>{debugger;
           console.error(error)})
    }
    render() {
      return (
        <div>
          <h1>Chat</h1>
          <p>Hare Krishna, {this.props.currentUsername}</p>
          HK !!!!
        </div>
      )
    }
}