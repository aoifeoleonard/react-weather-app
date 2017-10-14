import React, { Component } from 'react';
import './../assets/css/Toggle.css';
import add from './../assets/images/plus.jpg';
import AddLocationForm from './AddLocationForm';

class ToggleAddLocation extends Component {

  handleToggle = () => {
    this.props.onClickToggle(this.props.isOpen);
  }
  
  render() {
      if(this.props.isOpen){
        return <AddLocationForm
                  isOpen={this.props.isOpen}
                  onCancel={this.props.onClickToggle} />
      } else {
        return (
          <div>
            <button>
              <img src={add} className="add-icon" alt="add" onClick={this.handleToggle} />
            </button>
          </div>
        ) 
      }
  }
}

export default ToggleAddLocation;
