import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'assets/css/weatherDashboard.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import Convert from 'util/convertUtil';
import Weather from 'services/weatherService';
import Location from 'services/locationService';

class WeatherDashboard extends Component {

	state = {
		locations: [],
		lat: null,
		long: null
	};
		

	componentDidMount = () => {
		let lat = this.state.lat || 53.270668;
		let long = this.state.long ||  -9.056790;

		this.getWeatherLocation(lat, long);
	}

	componentDidUpdate = (prevProps, prevState) => {

		if (this.state.lat && !prevState.lat && this.state.long && !prevState.long) {
			this.getWeatherLocation(this.state.lat, this.state.long);
		}

	}

	getWeatherLocation = (lat, long) => {
		Weather.getWeatherLocation(lat, long)
			.then(
				(data) => {
					this.setState({ 
						locations: this.state.locations.concat(data), 
						lat: null, 
						long: null 
					});
				},
				(err) => {
					console.log('Error [getWeatherLocation()]', err);
				});

	}


	addNewLocation = (id) => {
		Location.addLocation(id)
			.then(
				(location) => {
					this.setState({ 
						lat: location.lat, 
						long: location.long });
				},
				(err) => {
					console.log('Error [getWeatherLocation()]', err);
				});
		
	}


	removeLocation = (city) => {
		this.setState({
			locations: this.state.locations.filter( loc => loc.name !== city )
		})
	}

	convertTemperatures = (temps, degree, city) => {	
		const temperatureArray = Convert.convertTemperatures(temps, degree, city, this.state);

		this.setState({
			locations: temperatureArray
		})
	}


  // original rendering
  render() {
	    return (
	    	<div>
			   	
				   	<WeatherList 
				   		locations = {this.state.locations}
				   		onConversion = {this.convertTemperatures}
				   		onRemove = {this.removeLocation}
				   	/>
			   	
			   	<div className="container-item">
			   		<ToggleAddLocation
			   			onAddNewLocation = {this.addNewLocation} 
			   		/>
			   	</div>
			   	
		    </div>
  	    ) 
	}

}

export default WeatherDashboard;

