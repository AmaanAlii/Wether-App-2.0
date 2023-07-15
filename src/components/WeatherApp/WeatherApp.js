import React from "react";
import "./WeatherApp.css";

function WeatherApp() {
  return (
    <div className="container">
      <div className="sub-container">
        <div className="head">
          <h1>Weather App</h1>
        </div>
        <div className="line"></div>
        <div className="form">
          <input type="text" placeholder="Enter City Name"></input>
        </div>
        <div className="button">
          <button>Check Weather</button>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
