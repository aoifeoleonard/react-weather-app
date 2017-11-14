import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'assets/css/weatherLocationStyle.css';
import 'assets/css/toggle.css';

class WeatherLocation extends Component {

    static propTypes = {
      temp: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired
    }

    state = {
      degree: ''
    }

    componentDidMount = () => {
      this.setState({ degree: 'C' })
    }


    handleConvert = () => {
      let temps = [this.props.temp, this.props.temp_max, this.props.temp_min];
      this.props.onConvert(temps, this.state.degree, this.props.city);
      this.setState({ degree: (this.state.degree === 'C') ? 'F' : 'C' })
    }

    handleRemove = () => {
      this.props.onRemove(this.props.city)
    }

    
  render() {
    return (
      <div className="location-container">

        <div className="col">
          <div className="item"><span className="temp-main">{this.props.temp}</span><span className="degree">&#176;{this.state.degree}</span></div>
          <div className="item"><span className="location-name">{this.props.city}</span></div>
        </div>
        
        <div className="col">
          <div className="item"><span className="weather-image"><img src={this.props.icon} alt="Weather icon" /></span></div>
          <div className="item"><span className="weather-description">{this.props.description}</span></div>
        </div>
        
        <div className="col">
          <div className="item"><span className="temp-sub">{this.props.temp_max}</span><span className="degree">&#176;{this.state.degree}</span></div>
          <div className="item"><span className="temp-sub">{this.props.temp_min}</span><span className="degree">&#176;{this.state.degree}</span></div>
        </div>
        
        <div className="col">
          <div className="item-list"><i className="fa fa-superpowers" aria-hidden="true"></i><span className="wind-speed">Windspeed {this.props.windSpeed}</span></div>
          <div className="item-list"><i className="fa fa-long-arrow-right" aria-hidden="true"></i><span className="wind-direction">Humididty {this.props.humidity}</span></div>
          <div className="item-list"><i className="fa fa-sun-o" aria-hidden="true"></i><span className="sunrise">{this.props.sunrise}</span></div>
          <div className="item-list"><i className="fa fa-moon-o" aria-hidden="true"></i><span className="sunset">{this.props.sunset}</span></div>
        </div>

        <div className="col">
         {/* 
            <div className='convert-button'>
           //   <button onClick={this.handleConvert}>Convert</button>
           // </div>
          */}
         <div className="toggle-button">
            <span className="degree">C</span>
            <label className="switch">
              <input type="checkbox" onChange={this.handleConvert}></input>
              <span className="slider round"></span>
            </label>
            <span className="degree">F</span>
          </div>
         <div className='remove-button'>
           <button className="remove" onClick={this.handleRemove}>x</button>
         </div>
        </div>

      </div>
    );
  }
}

export default WeatherLocation;
