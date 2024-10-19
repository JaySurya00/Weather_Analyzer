const weatherState = {};  // Store state for each city
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
   
    weatherDataArray.forEach(weatherData => {
        const { city, temp, main } = weatherData; 

        const tempThreshold = alertThreshold.temp || 35;   // Fetch temperature threshold
        const conditionThreshold = alertThreshold.condition || '';  
        const consecutiveCount = alertThreshold.consecutiveUpdates || 2;  

        // Initialize if no previous state for the city
        if (!weatherState[city]) {
            weatherState[city] = { consecutiveBreaches: 0, consecutiveConditionBreaches: 0 };
        }

        // Check if current temperature exceeds the threshold
        if (temp > tempThreshold) {
            weatherState[city].consecutiveBreaches += 1;
        } else {
            // Reset the counter if the temperature condition is not met
            weatherState[city].consecutiveBreaches = 0;
        }

        // Check if the current weather condition matches the threshold condition (if defined)
        if (conditionThreshold && main === conditionThreshold) {
            weatherState[city].consecutiveConditionBreaches += 1;
        } else {
            // Reset the counter if the condition is not met
            weatherState[city].consecutiveConditionBreaches = 0;
        }

        // Trigger alert if the temperature threshold is breached for the required consecutive updates
        if (weatherState[city].consecutiveBreaches >= consecutiveCount) {
            triggerAlert(city, temp, main, 'temperature');
            weatherState[city].consecutiveBreaches = 0;  // Reset after alerting
        }

        // Trigger alert if the condition threshold is breached for the required consecutive updates
        if (weatherState[city].consecutiveConditionBreaches >= consecutiveCount) {
            triggerAlert(city, temp, main, 'condition');
            weatherState[city].consecutiveConditionBreaches = 0;  // Reset after alerting
        }
    });
};

module.exports = checkThreshold