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
        const summaries = await WeatherSummary.find(); 
        res.render('weatherSummary', { summaries }); 
    } catch (error) {
        console.error("Error fetching weather summaries:", error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports=app;




