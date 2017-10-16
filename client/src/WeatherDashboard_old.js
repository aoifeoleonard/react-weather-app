import React, { Component } from 'react';
import 'assets/css/dashboardStyle.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import weather from 'models/Weather';
import GoogleMapService from 'services/GoogleMapsService';
import WeatherService from 'services/WeatherService';






class WeatherDashboard extends Component {


	state = {
		locations: [],
		lat: '',
		long: ''
		//isOpen: null,
	 };

	// componentDidMount = () => {

	// 	if(locations.length){

	// 	}

	// 	// weather.locations.forEach((loc) => {
	// 	// 	loc.temps.temp = Math.round(loc.temps.temp) - 270;
	// 	// 	loc.temps.temp_min = Math.round(loc.temps.temp_min) - 270;
	// 	// 	loc.temps.temp_max = Math.round(loc.temps.temp_max) - 270;
	// 	// 	loc.degree = 'C';
	// 	// })

	// 	// this.setState({ 
	// 	// 	locations: weather.locations
	// 	// })
	// }

		

	componentDidMount() {
		
		let lat;
		let long;

		if(!this.state.locations.length){
			lat = 53.270668;
			long = -9.056790;
		} else {
			lat = this.state.lat;
			long = this.state.long;
		}

		let newLocationObject = WeatherService.fetchWeather(lat, long);
				this.setState({
		    		locations: this.state.locations.concat(newLocationObject) 
		    })

		}



	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state.lat && !prevState.lat && this.state.long && !prevState.long) {
	// 		fetchWeather();
	// 	}
	// 	axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
	// 	.then(res => {
	// 	const data = res.data.result;
	// 	console.log('location data', data);
	// 	const lat = data.geomtery.location.lat;
	// 	const long = data.geomtery.location.lng; 
	// 	this.setState({ lat, long });
	// 	//Same as {
	// 	// this.setState({ 
	// 	// lat: lat, 
	// 	// long: long
	// 	// });
	// 	// }
	// 	});
	// }


	// fetchLatLong  = (id) => {
	// 		axios.get('/location/cityId=' + id )
	// 		.then(res => {
	// 			const data = res.data.result;
	// 			console.log('location data', data);
	// 			const lat = data.geomtery.location.lat;
	// 			const long = data.geomtery.location.lng; 
	// 		this.setState({ lat, long });
	// 		//Same as {
	// 		// this.setState({ 
	// 		// lat: lat, 
	// 		// long: long
	// 		// });
	// 		// }
	// 		});
	// }

	// fetchWeather = () => {
	// 		axios.get('/weather/lat=' + this.state.lat + '/long=' + this.state.long)
	// 		.then(function (res){
	// 		console.log('weather', res);
	// 		})
	// 		.catch(function (error) {
	// 		console.log('error', error);
	// 		}); 
	// }
	

	addNewLocation = (id) => {
		let location = GoogleMapService.fetchLatLong(id);
		const data = location.data.result;
		const lat = data.geomtery.location.lat;
		const long = data.geomtery.location.lng; 
		this.setState({ lat, long });
	}


	removeLocation = (city) => {

		this.setState({
			locations: this.state.locations.filter( loc => loc.city !== city )
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
			locations: temperatureArray
		})
			
		console.log('set state', temperatureArray)
	}


  render() {

  	if(!this.state.locations.length){
  		return (
  			<div className='container'>
		    		<div className="toggle-location">
			    		<ToggleAddLocation
			    			onAddNewLocation={this.addNewLocation} 
			    		/>
			    	</div>
		    	</div>
		    )
  	} else {

	    return (
	    	<div className='container'>
	    		<WeatherList 
	    			locations = {this.state.locations}
	    			onConversion = {this.conversion}
	    			onRemove = {this.removeLocation}
	    		/>
	    		
	    		<div className="toggle-location">
		    		<ToggleAddLocation
		    			onAddNewLocation={this.addNewLocation} 
		    		/>
		    	</div>
	    	</div>
  	    ) 
	  } 
	} 

}

export default WeatherDashboard;




	// function getLocationDetails() {
	// 	axios.get('/location/cityId=' + id)
	// 	.then(function (res){
	// 		let data = res.data.result;
	// 		console.log('location data', data);
	// 		lat = data.geomtery.location.lat;
	// 		long = data.geomtery.location.lng;
	// 	})
	// 	.catch(function (error) {
	// 		console.log('error', error);
	// 	});
	// };

	// function getLocationWeather() {
	// 	axios.get('/weather/lat=' + lat + '/long=' + long)
	// 		.then(function (res){
	// 			console.log('weather', res);
	// 		})
	// 		.catch(function (error) {
	// 			console.log('error', error);
	// 		});
	// };

	// getLocationDetails();
	// getLocationWeather();	



		// let city = newLocation;
		// let temp = Math.round(Math.random()*100);
		// let temp_min = Math.round(Math.random()*100);
		// let temp_max = Math.round(Math.random()*100);


		// let newLocationObject = { 
		//       "main":"Rain",
		//       "description":"Raining",
		//       "temps":{  
		//          "temp": temp,
		//          "pressure":1014,
		//          "humidity":72,
		//          "temp_min":temp_min,
		//          "temp_max":temp_max
		//       },
		//       "wind":{  
		//          "speed":7.7,
		//          "deg":140
		//       },
		//       "sys":{  
		//          "sunrise":1506407426,
		//          "sunset":1506450178
		//       },
		//       "city": city,
		//       "addDescription" : true,
		//       "description_user" : "",
		//       "degree": "C"
		//    }

		//    this.setState({
		//    		locations: this.state.locations.concat(newLocationObject) 
		//    })