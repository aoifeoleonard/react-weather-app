import axios from 'axios';
import Convert from 'util/convertUtil';
import Format from 'util/formatUtil';
// import Local from 'services/localizationService';

let weatherService = {

getWeatherLocation (lat, long, offset) {
	return axios.get('/weather/' + lat + '/' + long)
				.then(
				(res) => {

					let data = res.data;

					//retrieve icon for weather
					data.icon = data.weather[0].id;

					//format time stamp to hh:mm:ss
					data.sys.sunrise = Format.formatDateTime(data.sys.sunrise, offset);
					data.sys.sunset = Format.formatDateTime(data.sys.sunset, offset);

					// convert init temp to celcius
					data.main.temp = Convert.initTempConversion(res.data.main.temp);
					data.main.temp_min = Convert.initTempConversion(res.data.main.temp_min);
					data.main.temp_max = Convert.initTempConversion(res.data.main.temp_max);

					return data;
				},
				(err) => {
					console.log('Error [getWeatherLocation()]', err);
				});
				// .catch((err) => {
				// console.log('Error [getWeatherLocation()]', err);
				// });
	}



}

export default weatherService;