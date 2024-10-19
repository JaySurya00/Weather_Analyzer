// index.js
const mongoose = require('mongoose');
const { fetchWeatherData } = require('./services/weatherService');
const { processWeatherData } = require('./services/dataProcessor');
// const { checkAlerts } = require('./alertService');
require('dotenv').config();

const startMonitoring = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        setInterval(async () => {
            const rawWeatherData = await fetchWeatherData();
            const processedWeatherData = processWeatherData(rawWeatherData);
            // await calculateDailySummary(processedData);
            console.log(processedData);
            // checkAlerts(processedData);
        },   40* 1000); // every 5 minutes
    }
    catch (error) {
        console.log(error);
    }
};

startMonitoring().catch(console.error);
