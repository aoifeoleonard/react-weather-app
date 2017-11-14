(format  => {
	
	const convertDateTime = (timestamp) => {
		let d = new Date(timestamp*1000);
		let t = d.toTimeString().split(' ')[0];
		return t;
	}

	const convertKelvinToCelcius = (temp) => {
		return Math.round(temp) -270;
	}

	return {
		convertDateTime,
		convertKelvinToCelcius
	}

})();