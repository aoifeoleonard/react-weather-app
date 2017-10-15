import React, { Component } from 'react';
import 'assets/css/dashboardStyle.css';
import WeatherList from 'components/WeatherList';
import ToggleAddLocation from 'components/ToggleAddLocation';
import weather from 'models/Weather';


class WeatherDashboard extends Component {


	state = {
		locations: [],
		//isOpen: null,
	 };

	componentDidMount = () => {

		weather.locations.forEach((loc) => {
			loc.temps.temp = Math.round(loc.temps.temp) - 270;
			loc.temps.temp_min = Math.round(loc.temps.temp_min) - 270;
			loc.temps.temp_max = Math.round(loc.temps.temp_max) - 270;
			loc.degree = 'C';
		})

		this.setState({ 
			locations: weather.locations
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


	addNewLocation = (newLocation) => {

		let city = newLocation;
		let temp = Math.round(Math.random()*100);
		let temp_min = Math.round(Math.random()*100);
		let temp_max = Math.round(Math.random()*100);


		let newLocationObject = { 
		      "main":"Rain",
		      "description":"Raining",
		      "temps":{  
		         "temp": temp,
		         "pressure":1014,
		         "humidity":72,
		         "temp_min":temp_min,
		         "temp_max":temp_max
		      },
		      "wind":{  
		         "speed":7.7,
		         "deg":140
		      },
		      "sys":{  
		         "sunrise":1506407426,
		         "sunset":1506450178
		      },
		      "city": city,
		      "addDescription" : true,
		      "description_user" : "",
		      "degree": "C"
		   }

		   this.setState({
		   		locations: this.state.locations.concat(newLocationObject) 
		   })
	}

	removeLocation = (city) => {

		this.setState({
			locations: this.state.locations.filter( loc => loc.city !== city )
		})

	}

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
	    			onAddNewLocation={this.addNewLocation} 
	    		/>
	    	</div>
    	</div>
      )
  }
}

export default WeatherDashboard;
