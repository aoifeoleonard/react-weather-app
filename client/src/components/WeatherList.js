
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
			a.name > b.name ? 1 : a.name < b.name ? -1 : 0
		)

	
		const weatherComponents = this.props.locations.map((loc) => (


				<WeatherLocation
					id = {loc.id}
					city = {loc.name}
					degree = {loc.degree}
					temp = {loc.main.temp}
					temp_min = {loc.main.temp_min}
					temp_max = {loc.main.temp_max}
					icon = {loc.icon}
					description = {loc.weather[0].description}
					windSpeed = {loc.wind.speed}
					humidity = {loc.main.humidity}
					sunrise = {loc.sunrise}
					sunset = {loc.sunset}
					onConvert = {this.props.onConversion}
					onRemove = {this.props.onRemove}

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
