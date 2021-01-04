import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const formatData = data => {
  const {
    clouds: { all: cloudiness },
    main: {
      humidity, pressure, temp, temp_max: tempMax, temp_min: tempMin,
    },
    weather: [{ main: weatherCondition, description: weatherDescription, icon: weatherIcon }],
    wind: { deg: windDirection, speed: windSpeed },
  } = data;

  return {
    cloudiness,
    humidity,
    pressure,
    temp,
    tempMax,
    tempMin,
    weatherCondition,
    weatherDescription,
    weatherIcon: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
    windDirection,
    windSpeed,
  };
};

const Weather = ({ name }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`;

    axios.get(uri).then(({ data }) => {
      setWeatherData(formatData(data));
    });
  }, [name]);

  const {
    cloudiness,
    humidity,
    pressure,
    temp,
    tempMax,
    tempMin,
    weatherCondition,
    weatherDescription,
    weatherIcon,
    windDirection,
    windSpeed,
  } = weatherData;

  return (
    <section>
      <h4>
        Weather in
        {name}
      </h4>
      <p>{weatherCondition}</p>
      <p>{weatherDescription}</p>
      <img src={weatherIcon} alt={weatherDescription} />
      <p>
        Temperature:&nbsp;
        {temp}
        °C
      </p>
      <p>
        Cloudiness:&nbsp;
        <span>
          {cloudiness}
          %
        </span>
      </p>
      <p>
        Humidity:&nbsp;
        <span>
          {humidity}
          %
        </span>
      </p>
      <p>
        Pressure:&nbsp;
        <span>
          {pressure}
          hPa
        </span>
      </p>
      <p>
        Wind Speed:&nbsp;
        <span>
          {windSpeed}
          km/h
        </span>
      </p>
      <p>
        Wind Direction:&nbsp;
        <span>
          {windDirection}
          °
        </span>
      </p>
      <p>
        Min Temperature:&nbsp;
        {' '}
        <span>
          {tempMin}
          °C&nbsp;
        </span>
        Max Temperature:&nbsp;
        {' '}
        <span>
          {tempMax}
          °C
        </span>
      </p>
    </section>
  );
};

export default Weather;

Weather.propTypes = {
  name: PropTypes.string.isRequired,
};
