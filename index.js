// index.js

const { fetchWeatherData } = require('./services/weatherService');
const { processWeatherData } = require('./services/dataProcessor');
const dailyWeather= require('./services/dailyWeather');
const weatherSummary= require('./services/weatherSummary');
const alertSystem= require('./services/alertSystem');

const startMonitoring = async () => {
    try {
        console.log();
        if(!process.env.MONGO_URI){
            throw new Error('Mongo_URI not defined');
        }
        if(!process.env.API_KEY){
            throw new Error('API not defined');
        }
        setInterval(async () => {
            const rawWeatherData = await fetchWeatherData();
            const processedWeatherData = processWeatherData(rawWeatherData);
            dailyWeather(processedData);
            alertSystem(processedData);
            await weatherSummary(processedData);
            // checkAlerts(processedData);
        },   (process.env.INTERVAL || 2) * 60 * 1000); // every 5 minutes
    }
    catch (error) {
        console.log(error);
    }
};

startMonitoring().catch(console.error);
