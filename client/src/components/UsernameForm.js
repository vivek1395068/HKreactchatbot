import React,{Component} from "react";

export default class UsernameForm extends Component{

    constructor(props){
        super(props);
        this.state={
            username:""
        }
    }

    onchangeusername(e){
        this.setState({
            username:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state.username)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" placeholder="What is your username?" onChange={this.onchangeusername.bind(this)} ></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}