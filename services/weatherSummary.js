const WeatherSummary = require('../models/dailyWeatherModel.js');
const dailyWeatherData = require('../data/dailyWeatherData.js');

const calculateDailySummary = async (city, date) => {
    // Format the date as 'yyyy-mm-dd'
    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Get weather data for the specified city and date
    const dailyData = dailyWeatherData[city]?.[formattedDate];

    if (!dailyData || dailyData.length === 0) {
        console.log(`No data available for ${city} on ${formattedDate}`);
        return;
    }

    // Aggregate the weather data
    const summaryData = dailyData.reduce((acc, curr) => {
        acc.temps.push(curr.temp);
        acc.conditions[curr.main] = (acc.conditions[curr.main] || 0) + 1;
        return acc;
    }, { temps: [], conditions: {} });

    const averageTemp = summaryData.temps.reduce((a, b) => a + b, 0) / summaryData.temps.length;
    const maxTemp = Math.max(...summaryData.temps);
    const minTemp = Math.min(...summaryData.temps);
    const dominantCondition = Object.keys(summaryData.conditions).reduce((a, b) =>
        summaryData.conditions[a] > summaryData.conditions[b] ? a : b
    );

    // Prepare the summary object
    const summaryDataToSave = {
        city,
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),  // Save date without time
        averageTemp,
        maxTemp,
        minTemp,
        dominantCondition,
    };

    // Check if a summary already exists for the city and date, and update or insert
    await WeatherSummary.findOneAndUpdate(
        { city, date: summaryDataToSave.date },  // Query by city and date
        summaryDataToSave,  // Data to update
        { upsert: true, new: true }  // Upsert option: create if not exists, return the new doc
    );

    console.log(`Summary for ${city} on ${formattedDate} has been saved/updated.`);
};

module.exports = { calculateDailySummary };
