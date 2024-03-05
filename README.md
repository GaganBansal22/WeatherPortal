# WeatherPortal
## Introduction
Welcome to WeatherPortal, a weather website that allows users to search for weather details of any location
and retrieve the current weather conditions along with a 3-hour forecast for the next 5 days. This README file
provides an overview of the features, setup instructions, and guidelines for contributing to the project.

<img width="766" alt="1" src="https://github.com/GaganBansal22/WeatherPortal/assets/122668312/5b3a6802-0d4c-4353-814a-70f911e589ff">

## Features
- **Search Functionality**: Users can input any location (city, town, etc.) into the search bar to retrieve weather details.
- **Current Weather Details**: Provides current weather information such as temperature, humidity, wind speed, and weather conditions.
- **5-Day Forecast**: Displays a 5-day forecast with weather details including temperature highs and lows, wind speed, and weather conditions for every 3 hours.
- **Responsive Design**: The website is designed to be responsive and accessible across various devices and screen sizes.
## Technologies Used
- **Frontend**: HTML,CSS,JavaScript,React.js
- **APIs**: OpenWeatherMap API (for fetching weather data), BigDataCloud API (for reverse geocoding)
## Setup Instructions
To set up WeatherPortal locally, follow these steps:
1. Clone the repository to your local machine: git clone https://github.com/GaganBansal22/WeatherPortal.git 
2. Navigate to the project directory:
3. Obtain an API key from OpenWeatherMap by signing up on their website: [OpenWeatherMap API](https://openweathermap.org/api)
4. Obtain an API key from BigDataCloud by signing up on their website: [BigDataCloud API](https://www.bigdatacloud.com/)
5. Create a file named `.env` in the root directory of your project.
6. Inside `.env`, add the following lines and replace `'YOUR-OPENWEATHER-API'` and `'YOUR-BIGDATACLOUD-API'` with your actual
   API keys obtained from OpenWeatherMap and BigDataCloud:
   
   VITE_REACT_APP_weatherKey="YOUR-OPENWEATHER-API"
   
   VITE_REACT_APP_geocodingKey="YOUR-BIGDATACLOUD-API"
8. Save the `.env` file.
9. Download dependencies: npm i
10. Run the Server: npm run dev
11. Open your web browser and navigate to http://localhost:5173/ to access the WeatherPortal.
## Contributing
Contributions to the WeatherPortal are welcome! Here's how you can contribute:
- Fork the repository.
- Make your changes and enhancements.
- Submit a pull request with a clear description of your changes.
## Acknowledgements
We would like to express our gratitude to the following organizations for their contributions and support:
- **OpenWeatherMap** for providing the weather data API.
- **BigDataCloud** for providing the reverse geocoding data API.
