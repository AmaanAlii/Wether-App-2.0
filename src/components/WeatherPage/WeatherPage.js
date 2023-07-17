import React from "react";
import { useNavigate } from "react-router-dom";
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
import "../../Styles/Styles.css";

function WeatherPage({ weatherData }) {
  const navigate = useNavigate();
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
      {weatherData && typeof weatherData !== "string" && (
        <div className="data-container">
          <button
            className="button-go-back"
            onClick={() => {
              navigate("/");
            }}
          >
            &larr; Weather App
          </button>
          <div className="horizontal-line"></div>
          <div className="weather-icon-container">
            {getWeatherIcon(weatherData.weather[0].icon)}
          </div>
          <h1>{Math.round(weatherData.main.temp)}&deg;C</h1>
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
                <WiThermometer size="60" color="rgb(46, 123, 246)" />
                <div className="additional-text">
                  <span>
                    <strong className="main-text">
                      {Math.round(weatherData.main.feels_like)}
                      &deg;C
                    </strong>
                    <br />
                    <span className="small-text">Feels like</span>
                  </span>
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="humidity-container">
                <WiRaindrop size="60" color="rgb(46, 123, 246)" />
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

export default WeatherPage;
