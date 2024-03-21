import { Suspense, lazy, useRef } from "react";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import { requestMoviDetails } from "../../services/api.js";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

const MovieCast = lazy(() =>
  import("../../components/MovieCast/MovieCast.jsx")
);
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews.jsx")
);

const MovieDetailsPage = () => {
  const [film, setFilm] = useState(null);
  const { filmId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestMoviDetails(filmId);
        setFilm(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [filmId]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {film && (
        <div className={css.div}>
          <button type="button">
            <Link to={backLinkRef.current}>Go back</Link>
          </button>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.original_title}
            />
            <div>
              <h2>
                {film.original_title}(
                {film.release_date && film.release_date.split("-")[0]})
              </h2>
              <p>User Score: {Math.round(film.popularity / 100)}%</p>
              <h3>Overwiew</h3>
              <p>{film.overview}</p>
              <h3>Genres</h3>
              {film.genres.map((gen) => {
                return <p key={gen.id}>{gen.name}</p>;
              })}
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Suspense>
              <Routes fallback={<Loader />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
