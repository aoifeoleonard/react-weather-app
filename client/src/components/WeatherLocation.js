import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'assets/css/weatherLocation.css';
import 'assets/css/toggle.css';
import 'assets/css/weather-icons.css';

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

        <div>
            <div>
               <div className="location-name top-item">{this.props.city}</div>
            </div>

            <button className="remove top-item" onClick={this.handleRemove}>
              <i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
            </button>
            
            <div className="toggle-button toggle top-item">
                <span className="degree">C</span>
                  <label className="switch">
                    <input type="checkbox" onChange={this.handleConvert}></input><span className="slider round"></span>
                  </label>
                  <span className="degree">F</span>
              </div>

        </div>

        <div className="location-inner">
        
            <div className="col">
              <span className="temp-main">{this.props.temp}</span><span className="temp-degree degree">{this.state.degree}</span>
            </div>
            
            <div className="col">
              <div className="weather-image"><i className={"wi wi-owm-" + this.props.icon}></i></div>
              <div className="weather-description">{this.props.description}</div>
            </div>
            
            <div className="col">
              <div className="temp-sub">
                <span className="temp">{this.props.temp_max}</span><span className="temp-degree degree">{this.state.degree}</span>
              </div>
              <div className="temp-sub">
                 <span className="temp">{this.props.temp_min}</span><span className="temp-degree degree">{this.state.degree}</span>
              </div>
            </div>
            
            <div className="col">
            <ul>
              <li className="wind-speed"><i className="wi wi-strong-wind"></i>{this.props.windSpeed} m/s</li>
              <li className="wind-direction"><i className="wi wi-humidity"></i>{this.props.humidity} %</li>
              <li className="sunrise"><i className="wi wi-sunrise"></i>{this.props.sunrise}</li>
              <li className="sunset"><i className="wi wi-moonrise"></i>{this.props.sunset}</li>
            </ul>
            </div>

        </div>

      </div>
    );
  }
}

export default WeatherLocation;
