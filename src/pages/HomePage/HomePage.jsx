import { requestTrendingMovies } from "../../services/api.js";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";

const HomePage = () => {
  const [TrendMovies, setTrendMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestTrendingMovies();
        setTrendMovies(data);
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
      {TrendMovies !== null && <MovieList movies={TrendMovies} />}
    </>
  );
};

export default HomePage;
