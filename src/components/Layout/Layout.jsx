import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
