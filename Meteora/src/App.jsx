import { useEffect, useState } from "react"

import "./styles/App.css"
import "./styles/weatherThemes.css"

import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import Forecast from "./components/Forecast"

function App() {

  const weatherModes = [
    "sunny",
    "cloudy",
    "rainy",
    "thunderstorm",
    "snow"
  ]

  const [weatherType, setWeatherType] =
  useState("sunny")

  const [city, setCity] = useState("")

  const [weatherData, setWeatherData] =
  useState(null)

  const [forecastData, setForecastData] =
  useState([])

  const [loading, setLoading] =
  useState(false)

  const [error, setError] =
  useState("")

  useEffect(() => {

    let index = 0

    const interval = setInterval(() => {

      index++

      if(index >= weatherModes.length){

        index = 0

      }

      setWeatherType(weatherModes[index])

    }, 12000)

    return () => clearInterval(interval)

  }, [])

  /* WEATHER API */

  const getWeather = async () => {

    if(city === "") return

   const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try{

      setLoading(true)

      setError("")

      const response = await fetch(url)

      const data = await response.json()

      if(data.cod === "404"){

        setError("City not found 😭")

        setLoading(false)

        return
      }

      setWeatherData(data)

      /* FORECAST */

      const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

      const forecastResponse =
      await fetch(forecastUrl)

      const forecast =
      await forecastResponse.json()

      const dailyForecast =
      forecast.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
      )

      setForecastData(dailyForecast)

      const condition =
      data.weather[0].main.toLowerCase()

      if(condition.includes("cloud")){

        setWeatherType("cloudy")

      }

      else if(condition.includes("rain")){

        setWeatherType("rainy")

      }

      else if(condition.includes("thunder")){

        setWeatherType("thunderstorm")

      }

      else if(condition.includes("snow")){

        setWeatherType("snow")

      }

      else{

        setWeatherType("sunny")

      }

    }

    catch(error){

      console.log(error)

      setError("Something went wrong")

    }

    finally{

      setLoading(false)

    }

  }

  return (

    <div className={`app ${weatherType}`}>

      <div className="overlay"></div>

      {/* SUNNY */}

      {weatherType === "sunny" && (
        <>
          <div className="sun-glow"></div>

          <div className="sun-particles">

            {[...Array(25)].map((_, i) => (
              <span key={i}></span>
            ))}

          </div>
        </>
      )}

      {/* CLOUDS */}

      {(weatherType === "cloudy" ||
        weatherType === "rainy" ||
        weatherType === "thunderstorm") && (
        <div className="clouds"></div>
      )}

      {/* RAIN */}

      {(weatherType === "rainy" ||
        weatherType === "thunderstorm") && (

        <div className="rain">

          {[...Array(80)].map((_, i) => (
            <span key={i}></span>
          ))}

        </div>

      )}

      {/* THUNDER */}

      {weatherType === "thunderstorm" && (
        <div className="lightning"></div>
      )}

      {/* SNOW */}

      {weatherType === "snow" && (

        <div className="snow">

          {[...Array(60)].map((_, i) => (
            <span key={i}></span>
          ))}

        </div>

      )}

      {/* MAIN CARD */}

      <div className="weather-container">

        <h1 className="logo">
          Meteora
        </h1>

        <p className="tagline">
          Moody Weather Experience 🌦️
        </p>

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
        />

        {error && (

          <p className="error-message">
            {error}
          </p>

        )}

        <WeatherCard
          weatherData={weatherData}
          weatherType={weatherType}
          loading={loading}
        />

        <Forecast
          forecastData={forecastData}
        />

      </div>

    </div>

  )

}

export default App