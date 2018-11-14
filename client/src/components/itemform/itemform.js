import React, { Component } from 'react';
import './itemform.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/itemActions';
import { Redirect } from "react-router-dom";
import { withAlert } from 'react-alert'


class Itemform extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       description: '',
       redirect: false,
       error: ''
    }
  }

  onchange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: ''});
    this.props.addItem({
      name: this.state.name,
      description: this.state.description
    }).then(err => {
      if(err) {
        this.props.alert.error(err);
        this.setState({ error: <p className="text-danger text-center"> {err} </p>})
      } else {
        this.props.alert.info(`Item Added`);
        this.setState({
          redirect: true
        })
      }
    })
  }
  
  
  render(){

    if(this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div className="postform mx-auto">
        <h4 className="text-center">Add Item</h4>
        {this.state.error}
        <hr/>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input type="text" className="form-control" id="name" name="name" value={ this.state.name } onChange={ this.onchange }/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Item Description</label>
            <textarea className="form-control" name="description" id="description" cols="20" rows="5" value={ this.state.description } onChange={ this.onchange }></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

Itemform.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default connect(null, { addItem })(withAlert(Itemform));



