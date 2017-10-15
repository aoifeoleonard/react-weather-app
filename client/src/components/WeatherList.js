
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
