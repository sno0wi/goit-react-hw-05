import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Error 404: Page not found</p>
      <button type="button">
        <Link to="/">Back to home page</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
