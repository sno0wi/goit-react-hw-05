import { useParams } from "react-router";
import { requestMovieReviews } from "../../services/api.js";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const MovieReviews = () => {
  const [rewiews, setRewiews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestMovieReviews(movieId);
        setRewiews(data);
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
      {rewiews && (
        <ul>
          {rewiews.results.map((rewiew) => {
            return (
              <li key={rewiew.id}>
                <p>Author : {rewiew.author}</p>
                <p>Movie review: {rewiew.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
