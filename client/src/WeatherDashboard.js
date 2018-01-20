import React, { Component } from 'react';
import axios from 'axios';
import 'assets/css/weatherDashboard.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';

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
					data.main.temp = this.convertKelvinToCelcius(res.data.main.temp);
					data.main.temp_min =this.convertKelvinToCelcius(res.data.main.temp_min);
					data.main.temp_max = this.convertKelvinToCelcius(res.data.main.temp_max);

					return this.setState({ locations: this.state.locations.concat(data), lat: null, long: null });//  res.data;
				})
				.catch((err) => {
				console.log('Error [getWeatherLocation()]', err);
			});
	}

 

	convertDateTime = (timestamp) => {
		let d = new Date(timestamp*1000);
		let t = d.toTimeString().split(' ')[0];
		return t;
	}

	convertKelvinToCelcius = (temp) => {
		return Math.round(temp) -270;
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

		const temperatureArray = this.state.locations.map((loc) => {
		
			if(loc.name === city){
				
				let convertedTempObject = Object.assign({}, loc.main, {
					temp: updatedTempData[0],
					temp_max: updatedTempData[1],
					temp_min: updatedTempData[2]
				})

				return Object.assign({}, loc, {
					main: convertedTempObject,
					degree: updatedDegree
				})

			} else {
				return loc;
			}
			
		})

		this.setState({
			locations: temperatureArray
		})
			
		console.log('set state', temperatureArray)
	}


  // original rendering
  render() {
	    return (
	    	<div>
			   	
				   	<WeatherList 
				   		locations = {this.state.locations}
				   		onConversion = {this.conversion}
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

