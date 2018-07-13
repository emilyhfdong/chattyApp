import React, {Component} from 'react';



class NavBar extends Component {
  render() {
    // display the icons of online users in their respective colours
    const clientIcons = this.props.onlineClients.map(client => {
      return (
        <div className="icon" key={client.clientId}>
        <i className={`fa fa-user ${client.clientColour}Icon`}></i>
        <p className="icon-name">{client.name}</p>
        </div>
      )
    });
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <h1>
            <span className="orangeLetter">C</span>
            <span className="tealLetter">H</span>
            AT
            <span className="peachLetter">T</span>
            Y
          </h1>
          <h1>A<span className="orangeLetter">P</span>P</h1>
        </a>
        <div className="navbar-online-clients">
          <p className="clients-title">online users</p>
          <div className="navbar-client-icons">{clientIcons}</div>
        </div>
      </nav>
    );
  }
}
export default NavBar;