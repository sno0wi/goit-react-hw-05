import { useParams } from "react-router";
import { requestMovieCredits } from "../../services/api.js";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const MovieCast = () => {
  const [casts, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestMovieCredits(movieId);
        setCast(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {casts && (
        <ul>
          {casts.cast.map((cast) => {
            return (
              <li key={cast.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  alt=""
                  key={cast.id}
                />
                <p>Original name: {cast.original_name}</p>
                <p>Character: {cast.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
