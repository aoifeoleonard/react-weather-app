import React, { Component } from 'react';
//import './assets/css/Dashboard.css';
import WeatherList from './components/WeatherList';
//import WeatherLocation from './components/WeatherLocation';
import ToggleAddLocation from './components/ToggleAddLocation';
import Weather from './models/Weather';


class WeatherDashboard extends Component {


	state = {
		locations: [],
		isOpen: null,
	 };

	componentDidMount = () => {

		Weather.locations.forEach((loc) => {
			loc.temps.temp = Math.round(loc.temps.temp) - 270;
			loc.temps.temp_min = Math.round(loc.temps.temp_min) - 270;
			loc.temps.temp_max = Math.round(loc.temps.temp_max) - 270;
			loc.degree = 'C';
		})

		this.setState({ 
			locations: Weather.locations,
			isOpen: false,
		})
	}

	conversion = (temps, degree, city) => {	

		let convertTempCalc;
		let updatedTempData = [];
		//let convertedLocationObject;
		let updatedDegree;

		temps.forEach((temp) => {

			if(degree === 'C'){
				convertTempCalc = (9.0/5.0 * temp) + 32;
				updatedDegree = 'F';

			} else {
				convertTempCalc = 5.0/9.0 * (temp-32);
				updatedDegree = 'C';
			}
			updatedTempData.push(Math.round(convertTempCalc))
		})

		const tempObject = this.state.locations.map((loc) => {
		
			if(loc.city === city){
				
				let convertedTempObject = Object.assign({}, loc.temps, {
					temp: updatedTempData[0],
					temp_max: updatedTempData[1],
					temp_min: updatedTempData[2]
				})

				return Object.assign({}, loc, {
					temps: convertedTempObject,
					degree: updatedDegree
				})

			} else {
				return loc;
			}
			
		})

		this.setState({
			locations: tempObject
		})
			
		console.log('set state', tempObject)
	}

	handleToggleClick = (isOpen) => {
		// didn't make a copy???
		this.setState({
			isOpen: !isOpen
		})
	}

  
  render() {
    return (
    	<div className='container'>
    		<WeatherList 
    			locations = {this.state.locations}
    			onConversion = {this.conversion} />
    		<ToggleAddLocation 
    			isOpen={this.state.isOpen}
    			onClickToggle={this.handleToggleClick}
    		/>
    	</div>
      )
  }
}

export default WeatherDashboard;
