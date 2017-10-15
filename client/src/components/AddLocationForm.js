import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../assets/css/addLocationFormStyle.css';

class AddLocationForm extends Component {

  static propTypes = {
      onCancel: PropTypes.func
    }


  addNewLocation = () => {
    
  }

  handleCancel = () => {
    this.props.onCancel(this.props.isOpen);
  }

  render() {
    return(
      <div className="location-form">
        <input type='text' className="search-location" />
        <div className="add-cancel">
          <button onClick={this.addNewLocation}>
            <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
          </button>
          <button onClick={this.handleCancel}>
            <i class="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default AddLocationForm;