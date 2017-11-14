import format from './format.js';
import axios from 'axios';

(client => {

const getWeatherLocation = (lat, long) => {
		axios.get('/weather/' + lat + '/' + long)
				.then((res) => {

					let data = res.data;

					// retrieve icon for weather
					let iconCode = data.weather[0].icon;
					let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
					// create icon object on location object
					data.icon = iconUrl;

					// format time stamp to hh:mm:ss
					data.sys.sunrise = format.convertDateTime(data.sys.sunrise);
					data.sys.sunset = format.convertDateTime(data.sys.sunset);

					// convert init temp to celcius
					data.main.temp = format.convertKelvinToCelcius(res.data.main.temp);
					data.main.temp_min =format.convertKelvinToCelcius(res.data.main.temp_min);
					data.main.temp_max = format.convertKelvinToCelcius(res.data.main.temp_max);

					return data;
				})
				.catch((err) => {
				console.log('Error [getWeatherLocation()]', err);
			});
	}

	return {
		getWeatherLocation
	}

})(window);
