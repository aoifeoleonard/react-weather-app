import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'assets/css/addLocationFormStyle.css';

class AddLocationForm extends Component {

  static propTypes = {
      onNewLocation: PropTypes.func,
      onCancel: PropTypes.func
    };

    state = {
      location: ''
    };

  componentDidMount = () => {

     this.setState({
        location: ''
      });

     let inputNode = document.getElementById('add-location-input');
     let autoComplete = new window.google.maps.places.Autocomplete(inputNode);


     autoComplete.addListener('place_changed', () => {
        let place = autoComplete.getPlace();
        let placeId = place.place_id;
        this.setState({ location: placeId })

      })
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
        <input type='text' id="add-location-input" className="search-location" placeholder="Please enter location" autoFocus />
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
