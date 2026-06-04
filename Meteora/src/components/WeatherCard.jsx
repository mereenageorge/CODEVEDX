function WeatherCard({

  weatherData,
  weatherType,
  loading

}) {

  return (

    <div className="weather-card">

      {loading && (

        <h3 className="loading">
          Loading...
        </h3>

      )}

      <h2>
      {weatherData?.name || "Search City"}
     </h2>

     <h1>
    {weatherData?.main?.temp
    ? `${Math.round(weatherData.main.temp)}°C`
    : "--"}
    </h1>
      {weatherData?.weather?.[0]?.icon && (

        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt=""
        />

      )}

      <p>
        {weatherData?.weather?.[0]?.main || weatherType}
      </p>

      <div className="extra-info">

        <div>

          <h3>
            Humidity
          </h3>

          <p>
            {weatherData?.main?.humidity || "--"}%
          </p>

        </div>

        <div>

          <h3>
            Wind
          </h3>

          <p>
            {weatherData?.wind?.speed || "--"} km/h
          </p>

        </div>

      </div>

    </div>

  )

}

export default WeatherCard