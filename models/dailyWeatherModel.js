const mongoose = require('mongoose');

// Define a schema for storing daily summaries
const summarySchema = new mongoose.Schema({
    city: { type: String },
    date: { type: Date, unique:true },
    averageTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantCondition: String,
});

const WeatherSummary = mongoose.model('Summary', summarySchema);

module.exports= WeatherSummary;