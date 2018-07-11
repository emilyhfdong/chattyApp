import React, {Component} from 'react';

class Message extends Component {
  render() {
    const usernameStyle = {
      color: this.props.message.colour
    }

    const allImages = this.props.message.images && (
      this.props.message.images.map(image => (
        <img className="message-img" src={image.url} key={image.id}/>
      ))
    )
    console.log(this.props.message);
    return (
      <div className="message">
          <span style={usernameStyle} className="message-username">{this.props.message.username}</span>
          <span className="message-content">
            <div>{this.props.message.content}</div>
            {allImages}
          </span>
      </div>
    );
  }
}
export default Message;