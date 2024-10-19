const { fetchWeatherData } = require('./services/weatherService');
const { processWeatherData } = require('./services/dataProcessor');
const dailyWeather = require('./services/dailyWeather');
const weatherSummary = require('./services/weatherSummary');
const alertSystem = require('./services/alertSystem');
const dbConnect = require('./config/db');
const app = require('./app');

const start = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('Mongo_URI not defined');
        }
        if (!process.env.API_KEY) {
            throw new Error('API not defined');
        }
        await dbConnect();

        setInterval(async () => {
            const rawWeatherData = await fetchWeatherData();
            const processedWeatherData = processWeatherData(rawWeatherData);
            dailyWeather(processedWeatherData);
            alertSystem(processedWeatherData);
            await weatherSummary(processedWeatherData);
        }, (process.env.INTERVAL || 2) * 60 * 1000); // every 5 minutes
    }
    catch (error) {
        console.log(error);
    }
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
};


start().catch(console.error);