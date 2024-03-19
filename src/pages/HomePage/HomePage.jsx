import { requestTrendingMovies } from "../../services/api.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestTrendingMovies();
        setFilms(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
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
