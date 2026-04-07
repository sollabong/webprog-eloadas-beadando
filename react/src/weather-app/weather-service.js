const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=hu`
    ),
    fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=hu`
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    const errorData = await currentRes.json();
    throw new Error(errorData.message || 'Hiba történt a lekérés során');
  }

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  const filteredForecast = forecastData.list
    .filter((reading) => reading.dt_txt.includes('12:00:00'))
    .slice(0, 4);

  return {
    current: currentData,
    forecast: filteredForecast,
  };
};
