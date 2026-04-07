import './spa-container.css';
import { useState } from 'react';
import WeatherApp from '../../weather-app/weather-app.jsx';

const SpaContainer = () => {
  const [currentApp, setCurrentApp] = useState('menu');

  if (currentApp === 'weather') {
    return (
      <div className="spa-page-container">
        <section className="section">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentApp('menu')}
            style={{ marginBottom: '20px' }}
          >
            <i className="fas fa-arrow-left"></i> Vissza az app választóhoz
          </button>
          <WeatherApp />
        </section>
      </div>
    );
  }

  if (currentApp === 'valami') {
    return (
      <div className="spa-page-container">
        <section className="section">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentApp('menu')}
            style={{ marginBottom: '20px' }}
          >
            <i className="fas fa-arrow-left"></i> Vissza az app választóhoz
          </button>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Second App - Fejlesztés alatt</h2>
            <p>Hamarosan érkezik a másik alkalmazás!</p>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="spa-page-container">
      <section className="spa-container">
        <h2>
          <i className="fas fa-database"></i> Single Page App - React Apps
        </h2>
        <div className="spa-apps-container">
          <div className="app-card">
            <div className="app-card-header">
              <i className="fas fa-cloud"></i>
              <h3>First App</h3>
            </div>
            <div className="app-card-content">
              <p>
                Valós idejű időjárás adatok és 4 napos előrejelzés lekérése
                városnév alapján, az OpenWeatherMap API segítségével.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-save"
              onClick={() => setCurrentApp('weather')}
            >
              Megnézem
            </button>
          </div>
          <div className="app-card">
            <div className="app-card-header">
              <i className="fas fa-tree"></i>
              <h3>Second App</h3>
            </div>
            <div className="app-card-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <button type="button" className="btn btn-save">
              Megnézem
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpaContainer;
