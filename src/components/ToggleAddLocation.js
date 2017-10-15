import React, { Component } from 'react';
import './../assets/css/Toggle.css';
import AddLocationForm from './AddLocationForm';


class ToggleAddLocation extends Component {

  state = {
    isOpen: false
  };

  handleToggle = () => {
    let isOpen = this.state.isOpen; // any other way?
    this.setState({ 
      isOpen: !isOpen
    });
  };
  
  render() {
      if(this.state.isOpen){
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
