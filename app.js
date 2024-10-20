// index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const WeatherSummary = require('./models/dailyWeatherModel'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));



app.get('/weather-summary', async (req, res) => {
    try {
        // Fetch all weather summaries
        const summaries = await WeatherSummary.find();

        // Get today's date in 'YYYY-MM-DD' format
        const currentDate = new Date().toISOString().split('T')[0];

        // Fetch weather summaries for the current date
        const summariesForDate = await WeatherSummary.find({ date: currentDate });

        // Render the merged EJS template
        res.render('weatherSummary', { summaries, summariesForDate, date: currentDate });
    } catch (error) {
        console.error("Error fetching weather summaries:", error);
        res.status(500).send("Internal Server Error");
    }
});




module.exports=app;




