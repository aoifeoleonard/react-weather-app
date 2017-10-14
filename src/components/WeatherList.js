import React from 'react';
import WeatherLocation from './WeatherLocation';
//import './../assets/css/WeatherList.css';
//import Weather from './../models/Weather';


class WeatherList extends React.Component{

	render() {

		//const cities = 
		this.props.locations.sort((a,b) => 
			a.city > b.city ? 1 : a.city < b.city ? -1 : 0
		)
		// const locations = this.state.locations.sort((a,b) => 
		// 	b.temps.temp - a.temps.temp 
		// )
		//var that = this
		
		const weatherComponents = this.props.locations.map((loc) => (

				<WeatherLocation
					city = {loc.city}
					main = {loc.main}
					temp = {loc.temps.temp}
					temp_min = {loc.temps.temp_min}
					temp_max = {loc.temps.temp_max}
					onConvert = {this.props.onConversion}
					addDescription = {loc.addDescription}
					description = {loc.description_user}
					degree = {loc.degree}
      			 />
      		));

		return(
			<div className='weather-list'>
				{weatherComponents}
			</div>	
		)
	}
}

export default WeatherList;
