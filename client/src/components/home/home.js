import React, { Component } from 'react'
import Items from "../items/items";
import Loginform from "../loginform/loginform";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert'


class Home extends Component {
  render() {
    return (
      <div>
        <div className="row mb-5 jumbotron-fluid animated fadeIn">
          <div className={ this.props.auth.loggedIn ? "col-sm-12" : "col-sm-8" }>
            <div className="jumbotron">
              <div className="container pl-5">
                <h1 className="display-4">MERN Stack</h1>
                <p className="lead animated fadeIn">
                    A simple MERN Stack implementation with usefull scripts to kickstart development.
                </p>
              </div>
            </div>
          </div>
          {
            !this.props.auth.loggedIn ? (
              <div className="col">
                <Loginform />
              </div>
            ) : ''
          }
        </div>
        <Items />
      </div>
    )
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(withAlert(Home));
