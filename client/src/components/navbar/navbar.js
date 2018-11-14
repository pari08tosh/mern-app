import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './navbar.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';


class Navbar extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
        <Link className="navbar-brand ml-5 text-light" to="/">MERN APP</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              this.props.auth.loggedIn ? (
                <ul className="navbar-nav ml-auto mr-5">
                  <li className="nav-item">
                    <Link className="nav-link" to="/addItem">Add Item</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{cursor: 'pointer'}} href="#" onClick={this.logout}>Logout</a>
                  </li>
                </ul>
              ) : ''
            }
        </div>
      </nav>
    );
  }
}


Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })((Navbar));

