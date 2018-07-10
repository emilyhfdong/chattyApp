import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {
    const allMessages = this.props.messages.map(message => (
      <Message key={message.id} message={message}/>
    ));
    return (

      <main className="messages">
        {allMessages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;