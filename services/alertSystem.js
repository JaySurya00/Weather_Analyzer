const weatherState = {};
const alertThreshold = require('../config/alertThreshold.js');
const chalk = require('chalk');


const triggerAlert = (city, temp, main, type) => {
    const orange = chalk.hex('#FFA500'); 

    if (type === 'temperature') {
        console.log(orange(`ALERT! Temperature in ${city} has exceeded ${temp}°C for ${alertThreshold.consecutiveUpdates} consecutive updates.`));
    } else if (type === 'condition') {
        console.log(orange(`ALERT! Weather condition in ${city} is ${main} for ${alertThreshold.consecutiveUpdates} consecutive updates.`));
    }
};

const checkThreshold = (weatherDataArray) => {
    console.log(weatherDataArray);
   
    weatherDataArray.forEach(weatherData => {
        const { city, temp, main } = weatherData; 

        const tempThreshold = alertThreshold.temp || 35; 
        const conditionThreshold = alertThreshold.condition || '';  
        const consecutiveCount = alertThreshold.consecutiveUpdates || 2;  

        if (!weatherState[city]) {
            weatherState[city] = { consecutiveBreaches: 0, consecutiveConditionBreaches: 0 };
        }

        if (temp > tempThreshold) {
            weatherState[city].consecutiveBreaches += 1;
        } else {

            weatherState[city].consecutiveBreaches = 0;
        }


        if (conditionThreshold && main === conditionThreshold) {
            weatherState[city].consecutiveConditionBreaches += 1;
        } else {

            weatherState[city].consecutiveConditionBreaches = 0;
        }


        if (weatherState[city].consecutiveBreaches >= consecutiveCount) {
            triggerAlert(city, temp, main, 'temperature');
            weatherState[city].consecutiveBreaches = 0; 
        }


        if (weatherState[city].consecutiveConditionBreaches >= consecutiveCount) {
            triggerAlert(city, temp, main, 'condition');
            weatherState[city].consecutiveConditionBreaches = 0; 
        }
    });
};

module.exports = checkThreshold