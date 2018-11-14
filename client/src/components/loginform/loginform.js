import React, { Component } from 'react';
import './loginform.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { withAlert } from 'react-alert'


class Loginform extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: '',
       error: ''
    }
  }

  onchange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: ''});
    this.props.login({
      username: this.state.username,
      password: this.state.password
    }).then(err => {
      if(err) {
        this.props.alert.error(err);
        this.setState({ error: <p className="text-danger text-center"> {err} </p>})
      }
    });
  }
  
  
  render(){
    return (
      <div className="postform mx-auto">
        <h4 className="text-center">Login</h4>
        {this.state.error}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={ this.state.username } onChange={ this.onchange }/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={ this.state.password } onChange={ this.onchange }/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

Loginform.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(null, { login })(withAlert(Loginform));



