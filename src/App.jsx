import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
  }

  componentDidMount = () => {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = function (event) {
      console.log("Connected to server!");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      this.setState({messages: messages});
    }
  }


  onEnter = (username, content) => {
    const newMessage = {
      type: "postMessage",
      username: username,
      content: content,
    };

    if (this.state.currentUser.name !== username) {
      const newNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} has changed their name to ${username}`
      }
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: username}});
    }

    this.socket.send(JSON.stringify(newMessage));

  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container">
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <ChatBar onEnter={this.onEnter} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
