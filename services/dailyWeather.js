const dailyWeatherData = require('../data/dailyWeatherData.js');

const dailyWeather = (weatherDataArray) => {
    // Loop over each weather data point in the array
    weatherDataArray.forEach(weatherData => {
        const { city } = weatherData;

        // Get the current date as yyyy-mm-dd (to avoid using time)
        const currentDate = new Date().toISOString().split('T')[0];

        // Initialize the city's data if it doesn't exist
        if (!dailyWeatherData[city]) {
            dailyWeatherData[city] = {};
        }

        // Initialize the array for the current date if it doesn't exist
        if (!dailyWeatherData[city][currentDate]) {
            dailyWeatherData[city][currentDate] = [];
        }

        // Push the weather data to the array for the current date
        dailyWeatherData[city][currentDate].push(weatherData);
    });
};

module.exports = dailyWeather;
