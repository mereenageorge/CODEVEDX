function Forecast({ forecastData }) {

  return (

    <div className="forecast-container">

      {forecastData.map((day, index) => (

        <div
          className="forecast-card"
          key={index}
        >

          <h4>

            {new Date(day.dt_txt)
              .toLocaleDateString(
                "en-US",
                {
                  weekday:"short"
                }
              )}

          </h4>

          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt=""
          />

          <p>
            {Math.round(day.main.temp)}°C
          </p>

        </div>

      ))}

    </div>

  )

}

export default Forecast