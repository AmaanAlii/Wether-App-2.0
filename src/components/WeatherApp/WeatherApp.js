import React from "react";
import "./WeatherApp.css";
import axios from "axios";
import { useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiNightClear,
  WiThermometer,
  WiRaindrop,
} from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";

function WeatherApp() {
  const API_KEY = "2859cec3cc613ce0dd1615485d75864a";

  const fetchCoordinates = async (cityName) => {
    // this function fetches coordinates based on the city name
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=100&appid=${API_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather data:`, error);
      throw error;
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    // This function uses latitude and longitude to get better results
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather data:`, error);
      throw error;
    }
  };

  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (event) => {
    setCityName(event.target.value);
    setWeatherData(null);
  };

  const handleFetchWeather = async () => {
    try {
      if (!cityName) {
        setWeatherData("empty"); // Set the error message for empty city name
        return; // Exit the function to prevent further API calls
      }
      const cityData = await fetchCoordinates(cityName); // To fetch coordinates based on the city name
      if (cityData && cityData.length > 0) {
        const cityWeather = await fetchWeatherData(
          cityData[0].lat,
          cityData[0].lon
        );
        setWeatherData(cityWeather);
      } else {
        console.error(`Cannot find a city named: ${cityName}`);
        setWeatherData("error"); // Set the error message in the state
      }
    } catch (error) {
      console.error(`Cannot find a city named: ${cityName}`);
      setWeatherData("error");
      throw error;
    }
  };
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny className="weather-icon sunny" />;
      case "01n":
        return <WiNightClear className="weather-icon clear" />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <WiCloud className="weather-icon cloudy" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <WiRain className="weather-icon rainy" />;
      case "11d":
      case "11n":
        return <WiThunderstorm className="weather-icon thunderstorm" />;
      case "13d":
      case "13n":
        return <WiSnow className="weather-icon snowy" />;
      case "50d":
      case "50n":
        return <WiFog className="weather-icon foggy" />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div className="head">
          <h1>Weather App</h1>
        </div>
        <div className="line"></div>
        <div className="form">
          <input
            type="text"
            placeholder="Enter City Name"
            value={cityName}
            onChange={handleLocationChange}
          ></input>
          {weatherData === "error" && (
            <div className="error-message">
              Cannot find a city named: "{cityName}" ! <br /> Please enter a
              valid City Name.
            </div>
          )}
          {weatherData === "empty" && (
            <div className="error-message">
              You haven't entered any city name!
            </div>
          )}
        </div>
        <div className="button">
          <button onClick={handleFetchWeather}>Check Weather</button>
        </div>
      </div>
      {weatherData && typeof weatherData !== "string" && (
        <div className="data-container">
          <div className="weather-icon-container">
            {getWeatherIcon(weatherData.weather[0].icon)}
          </div>
          <h1>{Math.round(weatherData.main.temp - 273.15)}&deg;C</h1>
          <h3>{weatherData.weather[0].description.toUpperCase()}</h3>
          <div className="heading">
            <h2>
              <FaMapMarkerAlt />
              {weatherData.name}, {weatherData.sys.country}
            </h2>
          </div>

          <div className="lower-container">
            <div className="horizontal-line"></div>
            <div className="info-container">
              <div className="feels-container">
                <WiThermometer size="60" color="blue" />
                <div className="additional-text">
                  <span>
                    <strong className="main-text">
                      {Math.round(weatherData.main.feels_like - 273.15)}
                      &deg;C
                    </strong>
                    <br />
                    <span className="small-text">Feels like</span>
                  </span>
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="humidity-container">
                <WiRaindrop size="60" color="blue" />
                <div className="additional-text">
                  <span>
                    <strong className="main-text">
                      {weatherData.main.humidity}%
                    </strong>
                    <br />
                    <span className="small-text">Humidity</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
