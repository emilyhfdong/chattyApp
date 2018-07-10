import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

function generateRandomString() {
  const lettersAndNums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  var str = "";
  for (let i = 0; i < 6; i ++ ) {
    str += lettersAndNums[Math.floor(Math.random() * (61))];
  }
  return str;
}

class App extends Component {
  state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        id: "1",
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      { id: "2",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      }
    ]
  }

  componentDidMount = () => {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: "3", username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    this.socket = new WebSocket("ws://0.0.0.0:3001");

    this.socket.onopen = function (event) {
      console.log("Connected to server!");
    };


  }

  onEnter = (username, content) => {
    const newMessage = {
      //id: generateRandomString(),
      username: username,
      content: content,
    };
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages});

    this.socket.send(JSON.stringify(newMessage));

  }

  render() {
    console.log(this.state);
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
