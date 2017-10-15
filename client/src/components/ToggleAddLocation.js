import React, { Component } from 'react';
import './../assets/css/toggleAddLocationStyle.css';
import AddLocationForm from './AddLocationForm';


class ToggleAddLocation extends Component {

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
                  //isOpen={this.state.isOpen}
                  onCancel={this.handleToggle} />
      } else {
        return (
          <div className="add-toggle">
            <button onClick={this.handleToggle}>
              <i class="fa fa-plus-square-o fa-2x fa-button" aria-hidden="true"></i>
            </button>
          </div>
        ) 
      }
  }
}

export default ToggleAddLocation;
