import React, {Component} from 'react';

class Message extends Component {
  render() {

    const allImages = this.props.message.images && (
      this.props.message.images.map(image => (
        <img className="message-img" src={image.url} key={image.id}/>
      ))
    )
    return (
      <div className={`message ${this.props.message.colour}Message`}>
          <p className="message-username">{this.props.message.username}</p>
          <div className="message-content">
            <div>{this.props.message.content}</div>
            {allImages}
          </div>
      </div>
    );
  }
}
export default Message;