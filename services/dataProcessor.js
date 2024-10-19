// dataProcessor.js
const processWeatherData = (data) => {
    return data.map(cityData => ({
        city: cityData.name,
        main: cityData.weather[0].main,
        temp: cityData.main.temp,
        feels_like: cityData.main.feels_like,
        timestamp: new Date(cityData.dt * 1000),
    }));
};

module.exports = { processWeatherData };
