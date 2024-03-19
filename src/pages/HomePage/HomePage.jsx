import { requestTrendingMovies } from "../../services/api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import css from "./HomePage.module.css";

const HomePage = () => {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await requestTrendingMovies();
      setFilms(data);
    };

    getData();
  }, []);

  return (
    <>
      {films !== null && (
        <ul className={css.list}>
          {films.results.map((film) => (
            <li key={film.id}>
              <Link to={`/movies/${film.id}`}>{film.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
