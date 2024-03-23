import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      {movies !== null && (
        <ul className={css.list}>
          {movies.results.map((film) => (
            <li key={film.id} className={css.item}>
              <Link
                to={`/movies/${film.id}`}
                state={location}
                className={css.link}
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    alt={film.original_title}
                    width={125}
                  />
                  <p>{film.original_title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      ist
    </>
  );
};

export default MovieList;
