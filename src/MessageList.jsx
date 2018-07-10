import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx"

class MessageList extends Component {

  render() {
    const allMessages = this.props.messages.map(message => {
      if (message.type === "incommingMessage") {
        return (<Message key={message.id} message={message}/>)
      } else {
        return (<Notification key={message.id} message={message}/>)
      }
    })

    return (
      <main className="messages">
        {allMessages}
      </main>
    );
  }
}
export default MessageList;