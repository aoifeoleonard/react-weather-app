import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'assets/css/weatherDashboard.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import { convertTemperatures } from 'util/convertUtil';
import { getTimeLocalization } from 'services/localizationService';
import { getWeatherDetails } from 'services/weatherService';
import { addLocation } from 'services/locationService';

class WeatherDashboard extends Component {

	state = {
		locations: [],
		lat: null,
		long: null
	}

	componentDidMount() {
		const lat = this.state.lat || 53.270668;
		const long = this.state.long ||  -9.056790;

		getTimeLocalization (lat, long)
			.then( offset => this.getWeatherLocation(lat, long, offset)
		)	
	}

	componentDidUpdate (prevProps, prevState) {
		const { lat, long } = this.state;
		const { lat: prevLat, long: prevLong } = prevState;

		if (lat && !prevLat && long && !prevLong) {
			getTimeLocalization (lat, long)
				.then( offset => this.getWeatherLocation(lat, long, offset)
			)
		}
	}

	getWeatherLocation = (lat, long, offset) => {
		getWeatherDetails(lat, long, offset)
			.then(
				data => {
					this.setState({ 
						locations: this.state.locations.concat(data), 
						lat: null, 
						long: null 
					});
				},
				err => {
					console.log('Error [getWeatherLocation()]', err);
				})	
	}


	addNewLocation = id => {
		addLocation(id)
			.then(
				loc => {
					this.setState({ 
						lat: loc.lat, 
						long: loc.long });
				},
				err => {
					console.log('Error [getWeatherLocation()]', err);
				})
	}

	removeLocation = city => {
		this.setState({
			locations: this.state.locations.filter( loc => loc.name !== city )
		})
	}

	convertTemperatures = (temps, degree, city) => {	
		const temperatureArray = convertTemperatures(temps, degree, city, this.state);
		this.setState({
			locations: temperatureArray
		})
	}

  	render() {
	    return (
	    	<div>	
	    		<div className="container-item">
			   		<p>Press the "+" button to input a city to add to your weather location list.</p>
			   		<ToggleAddLocation onAddNewLocation = {this.addNewLocation} />
			   	</div>
			   	<WeatherList 
				   	locations = {this.state.locations}
				   	onConversion = {this.convertTemperatures}
				   	onRemove = {this.removeLocation}
				/>   	
		    </div>
  	    ) 
	}
}

export default WeatherDashboard;

