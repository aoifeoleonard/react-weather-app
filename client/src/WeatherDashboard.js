import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'assets/css/weatherDashboard.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import Convert from 'util/convertUtil';
import Format from 'util/formatUtil';
import Local from 'services/localizationService';
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

		Local.getTimeLocalization (lat, long)
			.then((offset) => {
				this.getWeatherLocation(lat, long, offset);
			})
		
	}

	componentDidUpdate = (prevProps, prevState) => {

		if (this.state.lat && !prevState.lat && this.state.long && !prevState.long) {
			Local.getTimeLocalization (this.state.lat, this.state.long)
				.then((offset) => {
					this.getWeatherLocation(this.state.lat, this.state.long, offset);
				})
			}

	}

	getWeatherLocation = (lat, long, offset) => {
		Weather.getWeatherLocation(lat, long, offset)
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
				})
			
	}


	addNewLocation = id => {
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


	removeLocation = city => {
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
	    		<div className="container-item">
			   		
			   		<p>Press the "+" button to input a city to add to your weather location list.</p>
			   		
			   		<ToggleAddLocation
			   		 	onAddNewLocation = {this.addNewLocation} 
			   		/>

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

