import React, { useState } from 'react';
import './App.css';

const api = {
  key: '6b008cae46dbfb6b6ca37033e06e446b',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const fetchWeather = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setSearch("");
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>
        {weather.main && (
          <div className="weather-panel">
            <div className="weather-container">
              <p className="weather-text">{weather.name}, {weather.sys.country}</p>
              <p className="temperature-text">{Math.round(weather.main.temp)}°C</p>
              <p className="weather-text">{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
