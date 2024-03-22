import { useEffect, useState, useRef } from "react";
import { requestSearchMovie } from "../../services/api.js";
import { Formik, Field, Form } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import css from "./MoviesPage.module.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  const handleSubmit = (searchTerm) => {
    if (searchTerm.trim().length === 0) {
      iziToast.error({
        title: "Hey",
        message: "Please enter a search term first!",
      });
      return;
    }
    if (films === null) {
      iziToast.error({
        message: "Sorry, but there was no movie found on your request.",
      });
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <>
      <Formik
        initialValues={{ query: searchQuery ?? "" }}
        onSubmit={(values) => {
          handleSubmit(values.query);
        }}
      >
        <Form className={css.form}>
          <Field
            placeholder="Search"
            type="text"
            name="query"
            className={css.input}
            innerRef={inputRef}
          />
          <button
            type="submit"
            title="Click to search"
            aria-label="Search"
            className={css.btn}
          >
            Search
          </button>
        </Form>
      </Formik>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {films && (
        <ul className={css.list}>
          {films.results.map((film) => (
            <li key={film.id} className={css.item}>
              <Link to={`/movies/${film.id}`} className={css.link}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                    alt={film.original_title}
                    width={125}
                    className={css.img}
                  />
                  <p>{film.original_title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
