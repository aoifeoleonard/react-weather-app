import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './WeatherLocation';

class WeatherList extends React.PureComponent{

	static propTypes = {
    	locations: PropTypes.array
  	}

	render() {
		return (
			<div>
				{this.props.locations.map((loc) => (
					<WeatherLocation
						id = {loc.id}
						key = {loc.id}
						city = {loc.name}
						temp = {loc.main.temp}
						temp_min = {loc.main.temp_min}
						temp_max = {loc.main.temp_max}
						icon = {loc.icon}
						description = {loc.weather[0].description}
						windSpeed = {loc.wind.speed}
						humidity = {loc.main.humidity}
						sunrise = {loc.sys.sunrise}
						sunset = {loc.sys.sunset}
						onConvert = {this.props.onConversion}
						onRemove = {this.props.onRemove}
	      			/>
	      		))}
			</div>
		)

	}
}

export default WeatherList;
