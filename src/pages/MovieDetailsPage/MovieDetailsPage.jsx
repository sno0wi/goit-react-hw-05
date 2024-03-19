import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { requestMoviDetails } from "../../services/api.js";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [film, setFilm] = useState(null);
  const { filmId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await requestMoviDetails(filmId);
      setFilm(data);
    };
    getData();
  }, [filmId]);

  if (film === null) {
    return <div>Loading...</div>;
  }
  const poster = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
  const year = film.release_date.split("-")[0];
  const popularity = Math.round((film.popularity / 1000) * 100);
  return (
    <div className={css.div}>
      <div>
        <img src={`${poster}`} alt={film.original_title} />
        <div>
          <h2>
            {film.original_title}({year})
          </h2>
          <p>User Score: {popularity}%</p>
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

        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
