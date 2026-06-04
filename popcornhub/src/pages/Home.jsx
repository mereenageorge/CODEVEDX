import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

const featuredMovies = []

function Home() {

  const [darkMode, setDarkMode] = useState(true)

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState("")

  const [movies, setMovies] = useState(featuredMovies)

  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    )

  }, [favorites])

  useEffect(() => {

    const loadFeaturedMovies = async () => {

      try {

        setLoading(true)

        const movieIDs = [
          "tt10872600",
          "tt1877830",
          "tt6146586",
          "tt4154796"
        ]

        const moviesData = await Promise.all(

          movieIDs.map(async (id) => {

            const response = await axios.get(
              `https://www.omdbapi.com/?i=${id}&apikey=64c4605a`
            )

            return response.data

          })

        )

        setMovies(moviesData)

        setLoading(false)

      }

      catch (error) {

        console.log(error)

        setLoading(false)

      }

    }

    loadFeaturedMovies()

  }, [])

  const toggleFavorite = (movie) => {

    const alreadyExists = favorites.find(
      (item) => item.imdbID === movie.imdbID
    )

    if (alreadyExists) {

      setFavorites(
        favorites.filter(
          (item) => item.imdbID !== movie.imdbID
        )
      )

    }

    else {

      setFavorites([...favorites, movie])

    }

  }

  const handleSearch = async () => {

    if (search.trim() === "") {

      const movieIDs = [
        "tt10872600",
        "tt1877830",
        "tt6146586",
        "tt4154796"
      ]

      const moviesData = await Promise.all(

        movieIDs.map(async (id) => {

          const response = await axios.get(
            `https://www.omdbapi.com/?i=${id}&apikey=64c4605a`
          )

          return response.data

        })

      )

      setMovies(moviesData)

      return

    }

    try {

      setLoading(true)

      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=64c4605a`
      )

      const searchResults = response.data.Search || []

      const detailedMovies = await Promise.all(

        searchResults.map(async (movie) => {

          const detailResponse = await axios.get(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=64c4605a`
          )

          return detailResponse.data

        })

      )

      setMovies(detailedMovies)

      setLoading(false)

    }

    catch (error) {

      console.log(error)

      setLoading(false)

    }

  }

  const getMovieDetails = async (id) => {

    try {

      setLoading(true)

      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=64c4605a`
      )

      setSelectedMovie(response.data)

      setLoading(false)

    }

    catch (error) {

      console.log(error)

      setLoading(false)

    }

  }

  return (

    <div className={darkMode ? "home dark" : "home light"}>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <section className="hero">

        <h1 className="hero-title">
          Welcome to PopcornHub 🍿
        </h1>

        <p>
          Discover trending movies, search your favorites,
          and explore the world of cinema.
        </p>

        <div className="search-section">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

      </section>

      {

        search && (

          <h2 className="search-text">
            Results for "{search}"
          </h2>

        )

      }

      <section className="genres-section">

        <button>Action</button>
        <button>Comedy</button>
        <button>Horror</button>
        <button>Romance</button>
        <button>Sci-Fi</button>

      </section>

      {

        loading && (

          <div className="loading">
            🍿 Loading movies...
          </div>

        )

      }

      <section className="trending-section">

        <h2>
          Movie Collection 🎬
        </h2>

        <div className="movies-grid">

          {

            movies.map((movie, index) => (

              <div
                className="movie-card"
                key={index}
                onClick={() => getMovieDetails(movie.imdbID)}
              >

                <img
                  src={movie.Poster}
                  alt={movie.Title}
                />

                <div className="movie-info">

                  <h3>{movie.Title}</h3>

                  <p>{movie.Year}</p>

                  {

                    movie.imdbRating && (

                      <p className="rating">
                        ⭐ {movie.imdbRating}
                      </p>

                    )

                  }

                  <button
                    className="fav-btn"
                    onClick={(e) => {

                      e.stopPropagation()

                      toggleFavorite(movie)

                    }}
                  >

                    {

                      favorites.find(
                        (item) =>
                          item.imdbID === movie.imdbID
                      )

                        ? "❌ Remove"
                        : "🤍 Favorite"

                    }

                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </section>

      {

        selectedMovie && (

          <div
            className="movie-modal"
            onClick={() => setSelectedMovie(null)}
          >

            <div
              className="movie-modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              <img
                src={selectedMovie.Poster}
                alt={selectedMovie.Title}
              />

              <h2>{selectedMovie.Title}</h2>

              <p>
                ⭐ IMDb Rating:
                {" "}
                {selectedMovie.imdbRating}
              </p>

              <p>
                🎭 Genre:
                {" "}
                {selectedMovie.Genre}
              </p>

              <p>
                🎬 Director:
                {" "}
                {selectedMovie.Director}
              </p>

              <p>
                👨‍🎤 Actors:
                {" "}
                {selectedMovie.Actors}
              </p>

              <p>
                📅 Released:
                {" "}
                {selectedMovie.Released}
              </p>

              <p>
                ⏱ Runtime:
                {" "}
                {selectedMovie.Runtime}
              </p>

              <p>
                🌍 Language:
                {" "}
                {selectedMovie.Language}
              </p>

              <p>
                🏆 Awards:
                {" "}
                {selectedMovie.Awards}
              </p>

              <p>
                📝 Plot:
                {" "}
                {selectedMovie.Plot}
              </p>

              <button
                className="close-btn"
                onClick={() => setSelectedMovie(null)}
              >
                Close
              </button>

            </div>

          </div>

        )

      }

    </div>

  )

}

export default Home