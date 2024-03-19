import { useParams } from "react-router";
import { requestMovieCredits } from "../../services/api.js";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { filmId } = useParams();
  const [casts, setCast] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await requestMovieCredits(filmId);
      setCast(data);
    };
    getData();
  }, [filmId]);

  if (casts === null) {
    return <div>Loading...</div>;
  }

  const profilePhotos = casts.cast.map(
    (cast) => `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
  );

  return (
    <ul>
      {casts.cast.map((cast, index) => {
        return (
          <li key={cast.cast_id}>
            <img src={profilePhotos[index]} alt="" />
            <p>Original name: {cast.original_name}</p>
            <p>Character: {cast.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
