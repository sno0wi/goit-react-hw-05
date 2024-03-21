import { useEffect, useState } from "react";
import { requestSearchMovie } from "../../services/api.js";
import { Formik, Field, Form } from "formik";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import { Link, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await requestSearchMovie(searchQuery);
        setFilms(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchQuery]);

  const handleSubmit = (searchTerm, formActions) => {
    if (searchTerm.trim().length === 0) {
      alert("Please enter a search term first!");
      return;
    }
    setSearchParams({ query: searchTerm });
    formActions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ query: searchQuery ?? "" }}
        onSubmit={(values) => {
          handleSubmit(values.query);
        }}
      >
        <Form>
          <Field placeholder="Search" type="text" name="query" />
          <button type="submit" title="Click to search" aria-label="Search">
            Search
          </button>
        </Form>
      </Formik>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {films && (
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
