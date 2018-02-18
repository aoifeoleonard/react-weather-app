let data = res.data;

// retrieve icon for weather
data.icon = data.weather[0].id;

// format time stamp to hh:mm:ss
data.sys.sunrise = Convert.convertDateTime(data.sys.sunrise);
data.sys.sunset = Convert.convertDateTime(data.sys.sunset);
// convert init temp to celcius
data.main.temp = Convert.initTempConversion(res.data.main.temp);
data.main.temp_min = Convert.initTempConversion(res.data.main.temp_min);
data.main.temp_max = Convert.initTempConversion(res.data.main.temp_max);

return data;