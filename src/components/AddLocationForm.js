import React, { Component } from 'react';
import './../assets/css/AddLocationForm.css';

// import cancel from './../assets/images/x-cancel.jpg';
// <img src={cancel} alt='' onClick={this.handleCancel} />

class AddLocationForm extends Component {

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