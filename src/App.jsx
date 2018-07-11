import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  state = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
    //numberOfClients: null,
    onlineClients: [],
  }

  componentDidMount = () => {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.addEventListener("open", event => {
      console.log("Connected to server!");
    })

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "onlineClient") {
        this.setState({onlineClients: data.clients});
        console.log(this.state.onlineClients)
      } else {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      }
    }
  }


  onEnter = (username, content) => {
    if (content !== null) {
      const newMessage = {
        type: "postMessage",
        username: username,
        content: content,
      };
      this.socket.send(JSON.stringify(newMessage));
    }

    if (this.state.currentUser.name !== username) {
      const newNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} has changed their name to ${username}`
      }
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: username}});
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar onlineClients={this.state.onlineClients}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar onEnter={this.onEnter} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
