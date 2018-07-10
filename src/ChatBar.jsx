import React, {Component} from 'react';

class ChatBar extends Component {
  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.props.onEnter(this.props.currentUser.name, event.target.value)
      event.target.value = "";
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyDown={this.onKeyDown} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;