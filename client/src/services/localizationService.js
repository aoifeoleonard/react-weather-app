import axios from 'axios';

let localizationService = {


getTimeLocalization (lat, long) {
	return axios.get('/timezone/' + lat + '/' + long)
			.then(
			(res) => {
				let utcOffset = res.data.rawOffset;
				let dstOffset = res.data.dstOffset;
				return utcOffset + dstOffset;
			},
			(err) => {
				console.log('Error [getTimeLocatlization()]', err);
			});
	},

}

export default localizationService;