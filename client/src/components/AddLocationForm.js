import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../assets/css/addLocationFormStyle.css';

class AddLocationForm extends Component {

  static propTypes = {
      onNewLocation: PropTypes.func.requrired,
      onCancel: PropTypes.func.required
    };

    state = {
      location: ''
    };

  componentDidMount = () => {

     this.setState({
        location: '' // leave blank??
      })

    }

  handleLocationChange = (e) => {

    this.setState({ location: e.target.value })
      
  }

  handleAddNewLocation = () => {

      this.props.onNewLocation(this.state.location);
      this.handleCancel();
  }

  handleCancel = () => {
    this.props.onCancel(this.props.isOpen);
  }

  render() {
    return(
      <div className="location-form">
        <input type='text' className="search-location" placeholder="Please enter location" onChange={this.handleLocationChange} />
        <div className="add-cancel">
          <button onClick={this.handleAddNewLocation}>
            <i className="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
          </button>
          <button onClick={this.handleCancel}>
            <i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default AddLocationForm;