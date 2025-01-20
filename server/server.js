require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const weatherKey = process.env.OPEN_WEATHER_API_KEY;
const googleKey = process.env.GOOGLE_PLACES_API_KEY;
let prevLocation, prevImageUrl;

app.use(cors());
app.use(express.json())
app.use("/api", async (req, res) => {
  const { location, units } = req.query;
  if (location !== prevLocation) { 
    prevLocation = location;
    const imageUrl = await getPlaceDetails(location)
    prevImageUrl = imageUrl
  }
  const weatherData = await fetchWeatherData(location, units)
  res.send({ data: { imageUrl: prevImageUrl, ...weatherData } });
});



const fetchWeatherData = async (cityName, units) => { 
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${weatherKey}`;
    const cityInfo = await fetch(cityUrl).then((response) => response.json());
  const { lon, lat } = cityInfo[0];

    const searchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${weatherKey}`;
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=Metric&appid=${weatherKey}`;
    const airPollutionInfo = await fetch(airPollutionUrl).then((response) =>
      response.json()
    );
    const weatherData = await fetch(searchUrl).then((response) =>
      response.json()
  );
  
  
    return { ...weatherData, ...airPollutionInfo, ...cityInfo[0] }
}

const getPlaceDetails = async (location) => {
  try {
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${googleKey}`;
    const placeDetailsResponse = await fetch(placeDetailsUrl).then((response) => response.json());
    const {photo_reference, height, width} = placeDetailsResponse.results[0].photos[0];
    return getPhotoUrl(photo_reference, height, width)
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
};

const getPhotoUrl = (photoReference, height, width) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&maxHeight=${height}&photoreference=${photoReference}&key=${googleKey}`;
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


//Make all of these into middleware functions 