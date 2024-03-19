import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MoviesPage from "./pages/MoviesPage/MoviesPage.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
// import {
//   requestTrendingMovies,
//   requestSearchMovie,
// } from "./services/api.js";
// import { useState } from "react";

function App() {
  // const [searchValue, setSearchValue] = useState("");

  // const handleSendRequestTrendingMovies = async () => {
  //   console.log(await requestTrendingMovies());
  // };

  // const handleSendRequestSearchMovie = async () => {
  //   console.log(await requestSearchMovie(searchValue));
  // };

  // const handleInputChange = (e) => {
  //   setSearchValue(e.target.value);
  // };

  return (
    <>
      {/* <button
        type="button"
        onClick={() => {
          handleSendRequestTrendingMovies();
        }}
      >
        Trending Movies
      </button>

      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendRequestSearchMovie();
        }}
      >
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button type="submit">SearchMovie</button>
      </form> */}

      <header className="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:filmId/*" element={<MovieDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
