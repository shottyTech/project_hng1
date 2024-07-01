 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// Function to fetch weather data
async function getWeatherData(city) {
  const apiKey = "c99a1d58bc052751078d34dcb384f910";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
  try {
    const response = await fetch(weatherURL);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
}

module.exports = getWeatherData
