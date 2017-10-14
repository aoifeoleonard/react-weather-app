import React, { Component } from 'react';
import cancel from './../assets/images/x-cancel.jpg';

class AddLocationForm extends Component {

  handleCancel = () => {
    this.props.onCancel(this.props.isOpen);
  }

  render() {
    return(
      <div>
        <input type='text' />
        <button>Add Location</button>
        <button>
          <img src={cancel} alt='' onClick={this.handleCancel} />
        </button>
      </div>
    )
  }
}

export default AddLocationForm;