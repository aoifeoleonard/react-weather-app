
let formatter = {

	formatDateTime (timestamp, offset) {

		let targetTime = timestamp+offset;
		let d = new Date(targetTime*1000);
		let t = d.toTimeString().split(' ')[0];
		return t;
	}
}

export default formatter;


