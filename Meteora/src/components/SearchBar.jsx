function SearchBar({

  city,
  setCity,
  getWeather

}) {

  return (

    <div className="search-box">

      <input
        type="text"
        placeholder="Search city..."
        value={city}

        onChange={(e) =>
          setCity(e.target.value)
        }

        onKeyDown={(e) => {

          if(e.key === "Enter"){

            getWeather()

          }

        }}
      />

      <button onClick={getWeather}>
        Search
      </button>

    </div>

  )

}

export default SearchBar