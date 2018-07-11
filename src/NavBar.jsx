import React, {Component} from 'react';



class NavBar extends Component {


  render() {
    const clientIcons = this.props.onlineClients.map(colour => {
      return (<i className="fa fa-user" style={{color: colour}}></i>)
    });
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-online-clients"> {this.props.onlineClients.length} users online {clientIcons}</p>
      </nav>
    );
  }
}
export default NavBar;