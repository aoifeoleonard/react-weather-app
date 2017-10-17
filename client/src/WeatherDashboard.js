// Updated

import React, { Component } from 'react';
import axios from 'axios';
import 'assets/css/dashboardStyle.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';


class WeatherDashboard extends Component {


	state = {
		locations: [],
		lat: null,
		long: null
	};
		

	 // load data
	componentDidMount = () => {

		let lat = this.state.lat || 53.270668;
		let long = this.state.long || -9.056790;

		axios.get('/weather/' + lat + '/' + long)
			.then((res) => {
				console.log('weather', res.data);

				// get weather icon
				let iconCode = res.data.weather[0].icon;
				let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
				res.data.icon = iconUrl;

				//set init degree to Celcius
				res.data.degree = 'C';

				// convert time
				res.data.sunrise = this.convertDateTime(res.data.sys.sunrise);
				res.data.sunset = this.convertDateTime(res.data.sys.sunset);

				// convert temp from Kelvin
				res.data.main.temp = this.convertKelvinToCelcius(res.data.main.temp);
				res.data.main.temp_min = this.convertKelvinToCelcius(res.data.main.temp_min);
				res.data.main.temp_max = this.convertKelvinToCelcius(res.data.main.temp_max);
				
				return this.setState({ locations: this.state.locations.concat(res.data)}); // res.data;	
			})
			.catch(function (error) {
				console.log('error', error);
			});
	}

	componentDidUpdate = (prevProps, prevState) => {

		if (this.state.lat && !prevState.lat && this.state.long && !prevState.long) {
		
		axios.get('/weather/' + this.state.lat + '/' + this.state.long)
				.then((res) => {
					console.log('updated weather', res.data);
					res.data.degree = 'C';
					let iconCode = res.data.weather[0].icon;
					let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
					res.data.icon = iconUrl;
					res.data.sunrise = this.convertDateTime(res.data.sys.sunrise);
					res.data.sunset = this.convertDateTime(res.data.sys.sunset);
					res.data.main.temp = Math.round(res.data.main.temp) -270;
					res.data.main.temp_min = Math.round(res.data.main.temp_min) -270;
					res.data.main.temp_max = Math.round(res.data.main.temp_max) -270;
					return this.setState({ locations: this.state.locations.concat(res.data), lat: null, long: null });//  res.data;
				})
				.catch(function (error) {
				console.log('error', error);
			}); 
		}

	}

	convertDateTime = (timestamp) => {
		let d = new Date(timestamp*1000);
		let t = d.toTimeString().split(' ')[0];

		return t;
	}

	convertKelvinToCelcius = (temp) => {
		return Math.round(temp) -270;
	}

	// fetchWeather = (lat, long) => {
	// 	axios.get('/weather/lat=' + long + '/long=' + lat)
	// 			.then((res) => {
	// 			return this.setState({ locations: this.state.locations.concat(res.data)})//res.data;
	// 			console.log('weather', res.data);
	// 			})
	// 			.catch(function (error) {
	// 			console.log('error', error);
	// 	}); 
	// }

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


	// works fine
	removeLocation = (city) => {

		this.setState({
			locations: this.state.locations.filter( loc => loc.name !== city )
		})

	}

	// works fine
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
	    	<div className='container'>
	    		<WeatherList 
	    			locations = {this.state.locations}
	    			onConversion = {this.conversion}
	    			onRemove = {this.removeLocation}
	    		/>
	    		
	    		<div className="toggle-location">
		    		<ToggleAddLocation
		    			onAddNewLocation = {this.addNewLocation} 
		    		/>
		    	</div>
	    	</div>
  	    ) 
	}

}

export default WeatherDashboard;

