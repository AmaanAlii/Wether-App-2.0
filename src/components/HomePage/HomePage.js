import React from "react";
import axios from "axios";
import API_KEY from "../API Data/ApiKey";
import "../../Styles/Styles.css";
import { useNavigate } from "react-router-dom";

function HomePage({ cityName, setCityName, weatherData, setWeatherData }) {
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    setCityName(event.target.value);
    setWeatherData(null);
  };

  class TimeoutError extends Error {
    constructor() {
      super("Request timed out");
      this.name = "TimeoutError";
    }
  }

  const fetchCoordinates = async (cityName) => {
    // this function fetches coordinates based on the city name
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1000&appid=${API_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather data:`, error);
      throw error;
    }
  };
  const fetchWeatherData = async (lat, lon) => {
    // This function uses latitude and longitude to get the weather data for the pin pointed location this ensures better results
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather data:`, error);
      throw error;
    }
  };

  const fetchWeatherDataWithTimeout = async (lat, lon) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new TimeoutError()); // Reject the promise with a timeout error
      }, 5000); // Set a timeout of 5 seconds (adjust as needed)

      fetchWeatherData(lat, lon)
        .then((data) => {
          clearTimeout(timeout); // Clear the timeout when the response is received
          resolve(data);
        })
        .catch((error) => {
          clearTimeout(timeout); // Clear the timeout on other errors
          reject(error);
        });
    });
  };

  const handleFetchWeather = async () => {
    try {
      if (!cityName) {
        setWeatherData("empty"); // Set the error message if the user presses the button without entering any city name
        return; // Exit the function to prevent further API calls
      }
      const cityData = await fetchCoordinates(cityName); // To fetch coordinates based on the city name
      if (cityData && cityData.length > 0) {
        const cityWeather = await fetchWeatherDataWithTimeout(
          cityData[0].lat,
          cityData[0].lon
        );
        setWeatherData(cityWeather);
        navigate("/weather");
      } else {
        console.error(`Cannot find a city named: ${cityName}`); // Set the error message if the user enters wrong city name.
        setWeatherData("error"); // Set the error message in the state
      }
    } catch (error) {
      if (error instanceof TimeoutError) {
        console.error("API request timed out. Please try again later.");
        setWeatherData("error");
      } else {
        console.error(`Cannot find a city named: ${cityName}`);
        setWeatherData("error");
        throw error;
      }
    }
  };
  return (
    <div className="container">
      <div className="sub-container">
        <div className="head">
          <h1 className="home-heading">Weather App</h1>
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
    </div>
  );
}

export default HomePage;
