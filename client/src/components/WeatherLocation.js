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

        <div className="top-bar">
          
          <div className="toggle-button top-item">
              <span className="degree">C</span>
                <label className="switch">
                  <input type="checkbox" onChange={this.handleConvert}></input>
                <span className="slider round"></span>
              </label>
                <span className="degree">F</span>
            </div>

          <button className="remove" onClick={this.handleRemove}>
            <i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
          </button>

        </div>

        <div className="location-inner">
        
            <div className="col">
              <div className="item"><span className="temp-main">{this.props.temp}</span><span className="degree">&#176;{this.state.degree}</span></div>
              <div className="location-name">{this.props.city}</div>
            </div>
            
            <div className="col">
              <div className="weather-image"><img className="weather-image" src={this.props.icon} alt="Weather icon" /></div>
              <div className="weather-description">{this.props.description}</div>
            </div>
            
            <div className="col">
              <div className="item"><span className="temp-sub">{this.props.temp_max}</span><span className="degree">&#176;{this.state.degree}</span></div>
              <div className="item"><span className="temp-sub">{this.props.temp_min}</span><span className="degree">&#176;{this.state.degree}</span></div>
            </div>
            
            <div className="col misc hidden">
              <div className="wind-speed">Windspeed {this.props.windSpeed}</div>
              <div className="wind-direction">Humididty {this.props.humidity}</div>
              <div className="sunrise"><i className="fa fa-sun-o" aria-hidden="true"></i>{this.props.sunrise}</div>
              <div className="sunset"><i className="fa fa-moon-o" aria-hidden="true"></i>{this.props.sunset}</div>
            </div>

        </div>

      </div>
    );
  }
}

export default WeatherLocation;
