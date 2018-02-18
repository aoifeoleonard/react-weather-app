
export const initTempConversion = (temp) => {
	return Math.round(temp) -270;
}

export const convertTemperatures = (temps, degree, city, state) => {
	

		let convertTempCalc;
		let updatedTempData = [];
		let updatedDegree;

		temps.forEach(temp => {

			if(degree === 'C'){
				convertTempCalc = (9.0/5.0 * temp) + 32;
				updatedDegree = 'F';

			} else {
				convertTempCalc = 5.0/9.0 * (temp-32);
				updatedDegree = 'C';
			}
			updatedTempData.push(Math.round(convertTempCalc))
		})

		const temperatureArray = state.locations.map(loc => {
		
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
}


