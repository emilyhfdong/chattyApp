import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-numberOfClients"> {this.props.numberOfClients} users online</p>
      </nav>
    );
  }
}
export default NavBar;