import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import WeatherPage from "../WeatherPage/WeatherPage";

function WeatherApp2() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cityName={cityName}
                setCityName={setCityName}
                weatherData={weatherData}
                setWeatherData={setWeatherData}
              />
            }
          />
          <Route
            path="/weather"
            element={<WeatherPage weatherData={weatherData} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default WeatherApp2;
