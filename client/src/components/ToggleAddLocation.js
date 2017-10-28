import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'assets/css/toggleAddLocationStyle.css';
import AddLocationForm from './AddLocationForm';


class ToggleAddLocation extends Component {

  static propTypes = {
    onAddNewLocation: PropTypes.func.required
  }

  state = {
    addLocationOpen: false
  };

  handleToggle = () => {
    this.setState(prevState => ({
      addLocationOpen: !prevState.addLocationOpen
    }))

  };
  
  render() {
      if(this.state.addLocationOpen){
        return <AddLocationForm
                  onNewLocation={this.props.onAddNewLocation}
                  onCancel={this.handleToggle} />
      } else {
        return (
          <div className="add-toggle">
            <button onClick={this.handleToggle}>
              <i className="fa fa-plus-square-o fa-2x fa-button" aria-hidden="true"></i>
            </button>
          </div>
      )
    }
  }
}

export default ToggleAddLocation;
