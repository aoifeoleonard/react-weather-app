import axios from 'axios';

export const addLocation = (id) => {
	return axios.get('/location/' + id)
		.then( res => {
			const data = res.data.result;
			const latInit = data.geometry.location.lat;
			const longInit = data.geometry.location.lng; 

			let location = { 
				lat : parseFloat(latInit.toFixed(6)),
				long : parseFloat(longInit.toFixed(6))
			}
				return location;
			})
			.catch(
				err => console.log('Error [getWeatherLocation()]', err)
			)
}