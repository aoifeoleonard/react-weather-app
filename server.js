var express = require('express'),
	request = require('request'),
	cors = require('cors'),
	path = require('path');

var app = express(); // create new instance

var  port = process.env.PORT || 3001; // declare port


// route handler
// every time / is hit - the function   will run
//req - client sends; res - we return
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/client/src/index.js'));
});

	app.get('/location/:cityId', function(req, res){
	
		const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
		let cityId = req.params.cityId;
		const APIToken = '&key=AIzaSyBT4EDd5hE3IoAPD11ZSipp_Y4M_lU4ak0';
		const url = baseUrl + cityId + APIToken;

		request(url).pipe(res);
	});

	app.get('/weather/:lat/:long', function(req, res){

		const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
		let latitude = req.params.lat; 
		let longitude = req.params.long;
		const APIToken = '&APPID=7c1514e4a1c6ab6c5f079a9037637ab8';
		
		const url = baseUrl + 'lat=' + latitude + '&lon=' + longitude + APIToken;

		request(url).pipe(res);
	});


app.use('*', cors({ origin: 'http://localhost:3000' }));



app.listen(port, function(){
	console.log('running on port: ' + port);
});

