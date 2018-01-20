import React, { Component } from 'react';
import axios from 'axios';
import 'assets/css/weatherDashboard.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import Convert from 'util/convertUtil';

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
		axios.get('/weather/' + lat + '/' + long)
				.then((res) => {

					let data = res.data;

					// retrieve icon for weather
					data.icon = data.weather[0].id;

					// format time stamp to hh:mm:ss
					data.sys.sunrise = this.convertDateTime(data.sys.sunrise);
					data.sys.sunset = this.convertDateTime(data.sys.sunset);

					// convert init temp to celcius
					data.main.temp = this.initTempConversion(res.data.main.temp);
					data.main.temp_min =this.initTempConversion(res.data.main.temp_min);
					data.main.temp_max = this.initTempConversion(res.data.main.temp_max);

					return this.setState({ locations: this.state.locations.concat(data), lat: null, long: null });//  res.data;
				})
				.catch((err) => {
				console.log('Error [getWeatherLocation()]', err);
			});
	}

 

	convertDateTime = (timestamp) => {
		return Convert.convertDateTime(timestamp);
	}

	initTempConversion = (temp) => {
		return Convert.initTempConversion(temp);
	}


	addNewLocation = (id) => {
		console.log('new location id', id)
		axios.get('/location/' + id )
			.then(res => {
				const data = res.data.result;
				const latInit = data.geometry.location.lat;
				const longInit = data.geometry.location.lng; 

				const lat = parseFloat(latInit.toFixed(6));
				const long = parseFloat(longInit.toFixed(6));

			this.setState({ lat, long });
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

