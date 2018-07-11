import React, {Component} from 'react';

class Message extends Component {
  render() {
    const usernameStyle = {
      color: this.props.message.colour
    }
    return (
      <div className="message">
        <span style={usernameStyle} className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;