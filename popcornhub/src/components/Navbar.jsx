import { Link } from "react-router-dom"

function Navbar({

  darkMode,
  setDarkMode

}) {

  return (

    <nav className="navbar">

      <h2 className="logo">
        🍿 PopcornHub
      </h2>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/favorites">
            Favorites
          </Link>
        </li>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </ul>

    </nav>

  )

}

export default Navbar