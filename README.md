




#  <i class="fa fa-cloud fa-1x" style="color: white"></i>  **Weather App V2 (Dashboard)**  

**Description**: This is the second version of my weather app. It is a significant improvement over version one and includes many new features.

**License Type**: Open

**Version**: 2.0

**URL**: https://master.dj1lv8genpute.amplifyapp.com/

**Old Version**: https://weather-app-dragondev.vercel.app/

## **Tech used**

### Languages
- TypeScript + JS + ES6
- SCSS + CSS

### JS Frameworks and Libraries
- React (Front-End JS Library)
- NextJs (Front-End Framework)
- ExpressJS (Back-End Framework)
- NodeJS (JS Run-time Environment)

### Third Party Libraries
- CORS
- DOTENV
- Nodemon
- Serverless-HTTP
- React-Icons

### APIs
- OpenWeatherAPI 3.0 (Weather Information)
- Google Places (Details and Place Images)
- Countries Now (City and Location Data)

### Deployment/Hosting
- AWS Lambda (Back-end/Server)
- AWS Amplify (Front-end/Client)

## **Old Features**

- The app uses the OpenWeatherAPI to fetch weather data for cities around the world.
- The background of the card changes based on both the weather and the time of day for the selected location. It accounts for whether it's day or night by comparing the city's local time with its timezone, as well as its sunrise and sunset times.
- A loading spinner is displayed while the weather data is being fetched.
- The card displays the following information:
  - The name of the city and the country it is located in
  - The current date, formatted as 'Day of the week, Month, Day of the month, Year'
  - The current time in AM/PM format
  - A weather type icon from React Icons
  - Some weather icons are specific to day or night, while others are shared between the two
  - The temperature in metric units (Celsius)
  - The "feels like" temperature in metric units (Celsius)
  - The rounded humidity percentage
  - The wind speed in metric units (km/h)
  - The wind direction, represented by an arrow that adjusts based on the wind's speed and angle

    
    
## **New Features**

- Utilizes the Next.js App Router query parameters for communication
- Unit toggle switch to toggle between metric and imperial units (Kilometers/Celsius to Miles/Fahrenheit )
- The card and app background change based on the current weather of the selected city and whether it is day or night. This is determined by comparing the city's current time to the local sunrise and sunset times.
- The search bar now includes a list of cities to choose from:
  - The search filters the list of cities and displays the closest matching city as you type
  - Pressing Enter or clicking the search icon (magnifying glass) will fetch the weather data for the city
  - Selecting a city from the list will initiate a search for that city’s weather data
  - Clicking the search bar after performing a search will reset the search bar text
  - If you type into the search bar without initiating a search and then click elsewhere, the search bar will not reset when you click back into it
  - If the location you enter is not in the list, the app will not attempt a search
- Uses the Google Places API to fetch an image of the location from Google Maps, which is displayed as the background of the main information card
- Back-end proxy server built with Node.js and Express.js, handling all API logic and data fetching
- Responsive design:
  - A navbar for mobile and tablet versions, which becomes a header on the desktop version
  - A responsive grid layout for the secondary information card (second card from the top) that switches to a different layout at tablet dimensions
  - The main information card switches the order of information and adapts to a grid layout on desktop
  - CSS `clamp()` is used for fluid, responsive text on the desktop version
- Hourly weather forecast card:
  - Displays time in AM/PM format, showing the current time and the next 24 hours
  - Shows weather conditions, temperature, and precipitation percentage for each hour
  - Scrollable carousel with left/right buttons, and touch support for scrolling on mobile devices
  - Includes a line graph component:
    - Displays temperature relative to other hourly temperatures
    - Perfectly aligned with the information on the bottom axis
    - The graph maintains a consistent height and scales/stretch values based on the highest and lowest temperatures
    - The graph dynamically adjusts based on the width of the hourly cards and the number of cards on the bottom axis, ensuring perfect alignment across devices
- 7-day weather forecast card:
  - Displays the day of the week, weather type icon, highest and lowest temperatures, and chance of precipitation
  - On mobile devices, the information is shown in a table format. On tablet-sized screens and larger, the information is displayed in a scrollable carousel similar to the hourly forecast
- Additional weather information for the current day:
  - Sunset and sunrise times
  - Day length (calculated as sunset - sunrise)
  - Visibility
  - AQI (Air Quality Index) with subscript chemical formula formatting, along with a breakdown by particle type


## **Changes**

- The app is no longer a Single Page Application (SPA); it is now a full-stack application.
- A back-end server is required to fetch data from the Google Places API, avoiding issues related to CORS
- Hosted on AWS instead of Vercel, with the back-end running on AWS Lambda and the front-end deployed via AWS Amplify
- API keys are stored in environment (ENV) files, ensuring they remain hidden and secure
- The app uses OpenWeatherAPI 3.0 instead of version 2.5 to provide more comprehensive weather data
- Wind direction is displayed visually as a compass rather than using a small arrow
- The WeatherApp now includes an icon beside the app name
- Different color schemes and gradients are applied for day and night versions of each weather type



