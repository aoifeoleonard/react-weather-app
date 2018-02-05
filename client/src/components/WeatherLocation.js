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
      <div className="location">
        <aside>
          <div className="content">
            
            <div className="expand-collapse current-weather">
              <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </div>
            
            <div className="icon">
              <i className={"wi wi-owm-" + this.props.icon}></i>
            </div>

            <div className="settings">
              
              <span className="toggle-button toggle top-item">
                <span className="temp">C</span>
                  <label className="switch">
                    <input type="checkbox" onChange={this.handleConvert}></input><span className="slider round"></span>
                  </label>
                  <span className="temp">F</span>
              </span>

              <button className="remove top-item" onClick={this.handleRemove}>
                <i className="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
              </button>

            </div>

            <div className="data">
              
              <h3 className="city">{this.props.city}</h3>
              
              <div className="temp-main"><span className="temp">{this.props.temp}</span>{this.state.degree}</div>
              
              <div className="temp-max-min">
                <span className="temp">{this.props.temp_min}</span> / <span className="temp">{this.props.temp_max}</span>
              </div>
              
              <div className="description">{this.props.description}</div>
            
            </div>
            
            <div className="information">
              <span><i className="wi wi-humidity"></i>{this.props.humidity} %</span>
              <span><i className="wi wi-strong-wind"></i>{this.props.windSpeed} m/s</span>
              <span><i className="wi wi-sunrise"></i>{this.props.sunrise}</span>
              <span><i className="wi wi-moonrise"></i>{this.props.sunset}</span>
            </div>
          
            <div className="expand-collapse five-day-forecast">
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </div>

          </div>
        </aside>
      </div>

      
    );
  }
}

export default WeatherLocation;
