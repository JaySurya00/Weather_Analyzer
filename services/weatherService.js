// weatherService.js
const axios = require('axios');

const API_KEY = process.env.API_KEY || "b2ae3f28eba3641cde38281c89801d49";

const CITIES = ['Delhi'];

const fetchWeatherData = async () => {
    try {
        const responses = await Promise.all(
            CITIES.map(city => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`))
        );
        return responses.map(response => response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
fetchWeatherData();

module.exports = { fetchWeatherData };
