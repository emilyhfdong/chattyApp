import React, {Component} from 'react';

class ChatBar extends Component {
  state = {
    username: this.props.currentUser.name,
    content: null
  }
  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.props.onEnter(this.state.username, this.state.content);
      this.state.content = null;
      event.target.value = null;
    }
  }
  onUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }
  onContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
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
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;