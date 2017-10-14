import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import WeatherDashboard from './WeatherDashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WeatherDashboard />, document.getElementById('root'));
registerServiceWorker();
