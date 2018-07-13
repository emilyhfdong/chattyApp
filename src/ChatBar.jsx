import React, {Component} from 'react';

class ChatBar extends Component {
  state = {
    username: this.props.currentUser.name,
    content: null
  }
  // if enter is pressed on either inputs,
  // the onEnter callback is called and the message input is cleared
  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      if (this.state.username === "") {
        this.props.onEnter("Anonymous", this.state.content);
      } else {
        this.props.onEnter(this.state.username, this.state.content);
      }
      this.state.content = null;
      event.target.value = null;
    }
  }
  // update the state of the chatbar when there is a change in the username input
  onUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }
  // update the state of the chatbar when there is a change in the message input
  onContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  render() {
    return (
      <footer className={`chatbar ${this.props.currentUser.clientColour}-bar`}>
        <input
          onChange={this.onUsernameChange}
          onKeyDown={this.onKeyDown}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
        />
        <input
          onChange={this.onContentChange}
          onKeyDown={this.onKeyDown}
          className="chatbar-message"
          value={this.state.message}
          placeholder="type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;