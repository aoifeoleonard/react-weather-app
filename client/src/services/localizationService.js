import axios from 'axios';

export const getTimeLocalization = (lat, long) => {
	return axios.get('/timezone/' + lat + '/' + long)
		.then( res => {
			let utcOffset = res.data.rawOffset;
			let dstOffset = res.data.dstOffset;
		
			return utcOffset + dstOffset;
		})
		.catch( 
			err => console.log('Error [getTimeLocatlization()]', err)
		)
}