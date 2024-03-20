import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestSearchMovie } from "../../services/api.js";
import { Formik, Field, Form } from "formik";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [searchFilm, setSearchFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestSearchMovie(searchFilm.search);
        setFilms(data);
      } catch {
        if (searchFilm !== null) {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchFilm]);

  const handleSubmit = (data, formActions) => {
    setSearchFilm(data);
    formActions.resetForm();
    navigate(`/movies?query=${data.search}`);
  };

  const INITIAL_FORM_DATA = {
    search: "",
  };

  return (
    <>
      <Formik initialValues={INITIAL_FORM_DATA} onSubmit={handleSubmit}>
        <Form>
          <Field type="text" name="search" />
          <button type="submit" title="Click to search" aria-label="Search">
            Search
          </button>
        </Form>
      </Formik>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {films && searchFilm !== null && (
        <ul>
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

export default MoviesPage;
