
let formatter = {

	formatDateTime (timestamp, offset) {

		let d = new Date((timestamp*1000) + offset);
		let t = d.toTimeString().split(' ')[0];
		return t;
	}
}

export default formatter;