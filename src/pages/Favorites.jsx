import { useState } from "react"

function Favorites() {

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  const removeFavorite = (id) => {

    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== id
    )

    setFavorites(updatedFavorites)

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    )

  }

  return (

    <div className="home dark">

      <section className="trending-section">

        <h2>
          ❤️ Favorite Movies
        </h2>

        <div className="movies-grid">

          {

            favorites.map((movie, index) => (

              <div
                className="movie-card"
                key={index}
              >

                <img
                  src={movie.Poster}
                  alt={movie.Title}
                />

                <div className="movie-info">

                  <h3>{movie.Title}</h3>

                  <p>{movie.Year}</p>

                  <p className="rating">
                    ⭐ {movie.imdbRating}
                  </p>

                  <button
                    className="fav-btn"
                    onClick={() =>
                      removeFavorite(movie.imdbID)
                    }
                  >
                    ❌ Remove
                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </section>

    </div>

  )

}

export default Favorites