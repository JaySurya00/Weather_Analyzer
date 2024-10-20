const WeatherSummary = require('../models/dailyWeatherModel.js');
const dailyWeatherData = require('../data/dailyWeatherData.js');

const weatherSummary = async (weatherData) => {

    for (const { city, timestamp } of weatherData) {

        const formattedDate = new Date(timestamp).toISOString().split('T')[0];
        const dailyData = dailyWeatherData[city]?.[formattedDate];

        if (!dailyData || dailyData.length === 0) {
            console.log(`No data available for ${city} on ${formattedDate}`);
            continue; 
        }

        try {

            const summaryData = dailyData.reduce((acc, curr) => {

                acc.temps.push(curr.temp);
                
                acc.conditions[curr.main] = (acc.conditions[curr.main] || 0) + 1;
            
                return acc;
            }, { temps: [], conditions: {} });
            
            const averageTemp = summaryData.temps.length > 0 ? 
                (summaryData.temps.reduce((a, b) => a + b, 0) / summaryData.temps.length) : 0;
            
            const maxTemp = summaryData.temps.length > 0 ? Math.max(...summaryData.temps) : null;
            const minTemp = summaryData.temps.length > 0 ? Math.min(...summaryData.temps) : null;
            
            const dominantCondition = Object.keys(summaryData.conditions).reduce((a, b) => 
                summaryData.conditions[a] > summaryData.conditions[b] ? a : b
            );

            const summaryDataToSave = {
                city,
                date: new Date(formattedDate), 
                averageTemp,
                maxTemp,
                minTemp,
                dominantCondition,
            };


            await WeatherSummary.findOneAndUpdate(
                { city, date: summaryDataToSave.date }, 
                summaryDataToSave,
                { upsert: true, new: true } 
            );
        } catch (error) {
            console.error(`Error saving summary for ${city} on ${formattedDate}:`, error);
        }
    }
};

module.exports = weatherSummary;
