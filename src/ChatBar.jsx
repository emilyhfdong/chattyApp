import React, {Component} from 'react';

class ChatBar extends Component {
  state = {
    username: this.props.currentUser.name,
  }
  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.props.onEnter(this.state.username, event.target.value)
      event.target.value = "";
    }
  }
  onChange = (event) => {
    this.setState({username: event.target.value});

  }
  render() {
    return (
      <footer className="chatbar">
        <input onChange={this.onChange} className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyDown={this.onKeyDown} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;