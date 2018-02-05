
let formatter = {

	formatDateTime (timestamp) {
		let d = new Date(timestamp*1000);
		let t = d.toTimeString().split(' ')[0];
		return t;
	}
}

export default formatter;