import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// function to get the date as a string
function getDate() {
  let today = Date().split(" ");
  today.splice(4);
  let todayStr = today.join(" ");
  return todayStr
}

class App extends Component {
  // set state for app
  state = {
    todaysDate: getDate(),
    currentUser: {name: "Anonymous"},
    messages: [],
    onlineClients: [],
  }

  componentDidMount = () => {
    this.socket = new WebSocket("ws://0.0.0.0:3001");

    // set up callback that runs when app recieves a message fro the websocket server
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let messages;
      switch (data.type) {
        // update current online users
        case "onlineClients":
          this.setState({onlineClients: data.clients});
          break;
        // set up name, id, and colour of current user
        case "clientInfo":
          this.setState({currentUser: data.client});
          break;
        // add message to array of messages
        case "incommingMessage":
          messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        // add notifications to the of messages
        case "incommingNotification":
          messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
      }
    }
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  // handler for when enter is pressed on the chat bar
  onEnter = (username, content) => {
    // if there is a new message, send message to websocket
    if (content !== null) {
      const newMessage = {
        type: "postMessage",
        username: username,
        content: content,
      };
      this.socket.send(JSON.stringify(newMessage));
    }
    // if the name has changed, update currentUser name in state
    // and send notification to websocket
    if (this.state.currentUser.name !== username) {
      const newNotification = {
        type: "postNotification",
        userId: this.state.currentUser.clientId,
        oldName: this.state.currentUser.name,
        newName: username,
      }
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: {
        name: username,
        clientId: this.state.currentUser.clientId,
        clientColour: this.state.currentUser.clientColour
      }});
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar onlineClients={this.state.onlineClients}/>
        <MessageList todaysDate={this.state.todaysDate} messages={this.state.messages}/>
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar onEnter={this.onEnter} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
