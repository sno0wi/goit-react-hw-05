import axios from "axios";

export const requestTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNkMmM2MGQyYWVlZDhjOTZkYTIzYWQwYjFhZDM1NyIsInN1YiI6IjY1Zjk0ZTJjMTVhNGExMDEyYzBjOGVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOjTDt21MJQG4tL1ay6-kyPYF3h1xIfj7SlkQuZk74k",
    },
  };

  const { data } = await axios.get(url, options);
  return data;
};

export const requestSearchMovie = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNkMmM2MGQyYWVlZDhjOTZkYTIzYWQwYjFhZDM1NyIsInN1YiI6IjY1Zjk0ZTJjMTVhNGExMDEyYzBjOGVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOjTDt21MJQG4tL1ay6-kyPYF3h1xIfj7SlkQuZk74k",
    },
  };

  const { data } = await axios.get(url, options);
  return data;
};

export const requestMoviDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNkMmM2MGQyYWVlZDhjOTZkYTIzYWQwYjFhZDM1NyIsInN1YiI6IjY1Zjk0ZTJjMTVhNGExMDEyYzBjOGVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOjTDt21MJQG4tL1ay6-kyPYF3h1xIfj7SlkQuZk74k",
    },
  };

  const { data } = await axios.get(url, options);
  return data;
};

export const requestMovieCredits = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNkMmM2MGQyYWVlZDhjOTZkYTIzYWQwYjFhZDM1NyIsInN1YiI6IjY1Zjk0ZTJjMTVhNGExMDEyYzBjOGVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOjTDt21MJQG4tL1ay6-kyPYF3h1xIfj7SlkQuZk74k",
    },
  };

  const { data } = await axios.get(url, options);
  return data;
};
