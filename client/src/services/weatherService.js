import axios from 'axios';

import { initTempConversion } from 'util/convertUtil';
import { formatDateTime, ucFirst } from 'util/formatUtil';
// import Local from 'services/localizationService';

export const getWeatherDetails = (lat, long, offset) => {
	return axios.get('/weather/' + lat + '/' + long)
				.then(res => {

					let data = res.data;

					//retrieve icon for weather
					data.icon = data.weather[0].id;

					//format time stamp to hh:mm:ss
					data.sys.sunrise = formatDateTime(data.sys.sunrise, offset);
					data.sys.sunset = formatDateTime(data.sys.sunset, offset);

					// convert init temp to celcius
					data.main.temp = initTempConversion(res.data.main.temp);
					data.main.temp_min = initTempConversion(res.data.main.temp_min);
					data.main.temp_max = initTempConversion(res.data.main.temp_max);

					data.weather[0].description = ucFirst(data.weather[0].description);

					return data;
				})
				.catch(err => {
					console.log('Error [getWeatherLocation()]', err);
				});
}


