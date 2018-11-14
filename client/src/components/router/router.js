import React, { Component } from 'react'
import Navbar from "../navbar/navbar";
import Itemform from "../itemform/itemform";
import { Route, Redirect, withRouter } from "react-router-dom";
import Home from '../home/home';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Router extends Component {

    // Higher Order Component for protecting routes

    AuthRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
        this.props.auth.loggedIn === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/', //Change this link to login link
                state: { from: this.props.location }
            }} />
        )} />
    )

    render() {
        return (
            <div>
                <Navbar />
                <Route exact path="/" component={Home} />
                <this.AuthRoute path="/addItem" component={Itemform} />
            </div>
        )
  }
}

Router.propTypes = {
    auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default withRouter(connect(mapStateToProps, {})(Router));
