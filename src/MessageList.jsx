import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx"

class MessageList extends Component {

  render() {
    // map through messages array
    // if message is a message return <Message/>
    // if message is a notification return <Notification/>
    const allMessages = this.props.messages.map(message => {
      if (message.type === "incommingMessage") {
        return (<Message key={message.id} message={message}/>)
      } else {
        return (<Notification key={message.id} message={message}/>)
      }
    });

    return (
      <main className="messages">
        <p className="messages-date"><span>{this.props.todaysDate}</span></p>
        {allMessages}
      </main>
    );
  }
}
export default MessageList;