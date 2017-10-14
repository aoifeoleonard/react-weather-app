import React, { Component } from 'react';
import './../assets/css/WeatherLocation.css';
import sun from './../assets/images/sunny.jpg';

class WeatherLocation extends Component {

  // constructor(props){
  //   super(props);

  //   this.handleTempConvert = this.handleTempConvert.bind(this); // bind 'this' to the function
      
  // }


        handleConvert = () => {

          let temps = [this.props.temp, this.props.temp_max, this.props.temp_min];

          this.props.onConvert(temps, this.props.degree, this.props.city);
        }

    
  render() {

    const submitText = this.props.description.length > 0 ? 'Update' : 'Save';

    return (
      <div className='location-main'>
        <div className='city-name'>
          <p>{this.props.city}</p>
        </div>
        <div className=''>
          <img src={sun} className="weather-img" alt="sun" />
        </div>
        <div className='temperature-group'>
          <div className='temp temp-main'>
            <p>{this.props.temp} {this.props.degree}</p>
          </div>
          <div className='temp-max-min'>
            <div className='temp temp-sm'>
              <p>{this.props.temp_min} {this.props.degree}</p>
            </div>
            <div className='temp temp-sm'>
              <p>{this.props.temp_max} {this.props.degree}</p>
            </div>
          </div>
        </div>
         <div className='convert-button'>
           <button onClick={this.handleConvert}>Convert</button>
         </div>
          <div>
            <div>
              <label>Comments:</label>
              <textarea>{this.props.description}</textarea>
            </div>
            <div>
              <button>{submitText}</button>
              <button>Cancel</button>
            </div>
          </div>          
        </div>
    );
  }
}

export default WeatherLocation;
