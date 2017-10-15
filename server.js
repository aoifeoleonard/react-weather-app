var express = require('express'),
	request = require('request'),
	cors = require('cors'),
	path = require('path');

var app = express(); // create new instance

var  port = process.env.PORT || 3001; // declare port


// route handler
// every time / is hit - the function   will run
//req - client sends; res - we return
// app.get('/', function(req, res){
// 	res.sendFile(path.join(__dirname + '/index.html'));
// });

	// app.get('/weather', function(req, res){

	// 	let city = 'Galway';//req.params.city; // 'Castlebar';
	// 	let countryCode = 'irl';//req.params.country; // 'irl';
	// 	const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
	// 	const APIToken = 'APPID=7c1514e4a1c6ab6c5f079a9037637ab8';
	// 	let url = baseUrl + city + '.' + countryCode + '&' + APIToken;

	// 		request(url).pipe(res);
	// });


app.use('*', cors({ origin: 'http://localhost:3000' }));



app.listen(port, function(){
	console.log('running on port: ' + port);
});

