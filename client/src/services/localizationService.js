import axios from 'axios';

let localizationService = {


getTimeLocalization (lat, long) {
	return axios.get('/timezone/' + lat + '/' + long)
			.then(
			(res) => {
				return res.data.rawOffset;
			},
			(err) => {
				console.log('Error [getTimeLocatlization()]', err);
			});
	}
}

export default localizationService;