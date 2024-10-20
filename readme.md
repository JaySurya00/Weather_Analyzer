# Weather Monitoring Application

## About
The Weather Monitoring Application provides real-time weather updates and historical weather data visualizations. Users can monitor weather conditions in multiple cities, view daily weather summaries (including average, max, and min temperatures), and analyze historical weather trends. Additionally, the application alerts users about significant weather changes, such as extreme temperatures or adverse weather conditions.

## Features
- **Real-time Weather Data Retrieval**: Fetches and displays current weather conditions.
- **Daily Weather Summaries**: Provides average, maximum, and minimum temperatures for each day.
- **Historical Weather Trends Visualization**: Allows users to view and analyze weather trends over time.
- **Weather Alerts**: Console alerts for extreme weather conditions (temperature or weather conditions).
- **User-Friendly Interface**: Built using EJS for dynamic templating.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the application.
- **MongoDB**: NoSQL database for storing weather data and summaries.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **EJS**: Templating engine for rendering HTML pages.
- **Chart.js**: JavaScript library for creating interactive charts and graphs.
- **dotenv**: For managing environment variables.
- **Nodemon**: For auto-restarting the server during development.

## Architecture
The application follows a **monolithic architecture**, with the database being a **non-relational (MongoDB)** database chosen for its flexibility and scalability. The front-end makes use of **EJS templating** combined with **Chart.js** for dynamic data visualization.

## Project Setup

### Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **MongoDB** (locally or through a service like MongoDB Atlas)
- **API key** from a weather data provider (e.g., OpenWeatherMap)

### Step 1: Clone the Repository
Clone the repository to your local machine:

git clone https://github.com/JaySurya00/Weather_Analyzer.git
cd Weather_Analyzer

### Step 2: Install Dependencies
bash
npm install

### Step 3:  Configure Environment Variables
Create a .env file in the root directory of the project.
Add the following variables to the .env file:
API_KEY=
INTERVAL=
MONGO_URI=
PORT=

### Step 5: Run the Application
npm start
Open your web browser and navigate to http://localhost:3000/weather-summary (or the port specified in your app) to access the summary dashboard.

## Note
Alert is displayed in the console.

## Testing the Application
You can test the functionality by configuring files in the config folder.
The config folder contains:
***alertThreshold.js:*** File for configuring threshold value.
***citiesConfig.js:*** File for configuring cities.
***db.js:*** File for configuring MongoDB connection.

