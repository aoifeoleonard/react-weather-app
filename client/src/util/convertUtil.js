let utils = {

convertDateTime (timestamp) {
		let d = new Date(timestamp*1000);
		let t = d.toTimeString().split(' ')[0];
		return t;
	},
// convert Kelvin to Celcius init conversion
initTempConversion (temp) {
		return Math.round(temp) -270;
	},


convertTemperatures (temps, degree, city, state) {
	

		let convertTempCalc;
		let updatedTempData = [];
		//let convertedLocationObject;
		let updatedDegree;

		temps.forEach((temp) => {

			if(degree === 'C'){
				convertTempCalc = (9.0/5.0 * temp) + 32;
				updatedDegree = 'F';

			} else {
				convertTempCalc = 5.0/9.0 * (temp-32);
				updatedDegree = 'C';
			}
			updatedTempData.push(Math.round(convertTempCalc))
		})

		const temperatureArray = state.locations.map((loc) => {
		
			if(loc.name === city){
				
				let convertedTempObject = Object.assign({}, loc.main, {
					temp: updatedTempData[0],
					temp_max: updatedTempData[1],
					temp_min: updatedTempData[2]
				})

				return Object.assign({}, loc, {
					main: convertedTempObject,
					degree: updatedDegree
				})

			} else {
				return loc;
			}


			
		})

		return temperatureArray;
		// this.setState({
		// 	locations: temperatureArray
		// })
			
		// console.log('set state', temperatureArray)
	}

}

export default utils;