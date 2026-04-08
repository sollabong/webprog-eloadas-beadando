import { useState } from 'react';
import { getWeatherData } from './weather-service.js';
import './weather-app.css';
import '../../../style/style.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const data = await getWeatherData(city);
      setWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  return (
    <div className="weather-app-wrapper">
      <h2>
        <i className="fas fa-cloud"></i> Weather App - Időjárás előrejelzés
      </h2>
      <form className="search-section" onSubmit={handleSearch}>
        <div class="search-fields">
          <i class="fa-solid fa-magnifying-glass"></i>
          <label for="searchInput" class="search-label">
            VÁROS NEVE
          </label>
          <input
            type="text"
            id="searchInput"
            placeholder="Melyik város időjárása érdekel? (pl. Budapest)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Keresés</button>
        </div>
      </form>

      {weather && (
        <>
          <div className="main-weather-card">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="main-temp">{Math.round(weather.main.temp)}°</div>
            <div className="weather-icon-lg">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="icon"
              />
            </div>
            <div className="weather-desc">{weather.weather[0].description}</div>

            <div className="weather-details-grid">
              <div>Szél: {weather.wind.speed} m/s</div>
              <div>Nyomás: {weather.main.pressure} hPa</div>
              <div>Páratartalom: {weather.main.humidity} %</div>
              <div>Felhőzettség: {weather.clouds.all} %</div>
            </div>
          </div>

          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <h4>
                  {new Date(day.dt * 1000).toLocaleDateString('hu-HU', {
                    weekday: 'long',
                  })}
                </h4>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="icon"
                />
                <div className="forecast-temp">
                  {Math.round(day.main.temp)}°
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                  {day.weather[0].description}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
