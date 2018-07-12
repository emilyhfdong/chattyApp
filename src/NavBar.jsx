import React, {Component} from 'react';



class NavBar extends Component {


  render() {
    const clientIcons = this.props.onlineClients.map(colour => {
      return (<i className={`fa fa-user ${colour}Icon`}></i>)
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