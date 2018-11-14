import React, { Component } from 'react';
import "./items.scss";
import { connect } from 'react-redux';
import { getItems } from '../../actions/itemActions';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';

class Items extends Component {

  componentDidMount() {
    this.props.getItems()
      .then(err => {
        if(err) {
          this.props.alert.error(err);
        }
      });
  }

  render() {
    if(this.props.items.loading)
    {
      return (
        <div className="loading text-center animated fadeIn delay-1s">
          <h3>Loading...</h3>
        </div>
      )
    }
    const items = this.props.items.items.map(item => (
      <div key={item._id} className="item pb-2 col-sm-4">
        <h5 className="text-capitalize">{item.name}</h5>
        <p>{item.description}</p>
        <hr/>
      </div>
    ));
    return (
      <div className="items mx-auto">
        <div className="animated fadeIn">
          <h3 className="text-center animated">Current Items</h3>
          <hr/>
          <br/><br/>
          <div className="row">
            {items}
          </div>
        </div>
      </div>
    )
  }
}

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  items: state.items
})

export default connect(mapStateToProps, { getItems })(withAlert(Items));