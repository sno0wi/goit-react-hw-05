import { useParams } from "react-router";
import { requestMovieReviews } from "../../services/api.js";
import { useEffect, useState } from "react";

const MovieReviews = () => {
  const { filmId } = useParams();
  const [rewiews, setRewiews] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await requestMovieReviews(filmId);
      setRewiews(data);
    };
    getData();
  }, [filmId]);

  if (rewiews === null) {
    return <div>Loading...</div>;
  }

  console.log(rewiews);

  return (
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
  );
};

export default MovieReviews;
