const dailyWeatherData = require('../data/dailyWeatherData.js');

const dailyWeather = (weatherDataArray) => {
    weatherDataArray.forEach(weatherData => {
        const { city } = weatherData;

        const currentDate = new Date().toISOString().split('T')[0];

        if (!dailyWeatherData[city]) {
            dailyWeatherData[city] = {};
        }

        if (!dailyWeatherData[city][currentDate]) {
            dailyWeatherData[city][currentDate] = [];
        }

        dailyWeatherData[city][currentDate].push(weatherData);
    });
};

module.exports = dailyWeather;
