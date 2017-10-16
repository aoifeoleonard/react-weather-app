
import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './WeatherLocation';



//Since this is a list it's better for performance to use PureComponent,
//this means react only does a reconciliation if state or props changed

class WeatherList extends React.PureComponent{

	static propTypes = {
    	locations: PropTypes.array
  	}


	render() {

		this.props.locations.sort((a,b) => 
			a.city > b.city ? 1 : a.city < b.city ? -1 : 0
		)

	
		const weatherComponents = this.props.locations.map((loc) => (


				<WeatherLocation
					id = {loc.id}
					city = {loc.name}
					temp = {loc.main.temp}
					temp_min = {loc.main.temp_min}
					temp_max = {loc.main.temp_max}
					onConvert = {this.props.onConversion}
					onRemove = {this.props.onRemove}
					description = {loc.weather[0].description}
					degree = {loc.degree}
					windSpeed = {loc.wind.speed}
					sunrise = {loc.sys.sunrise}
					sunset = {loc.sys.sunset}
					humidity = {loc.main.humidity}
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
