import { NavLink } from "react-router-dom";
import css from "./Layout.module.css";
import clsx from "clsx";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    active: isActive,
  });

const Layout = ({ children }) => {
  return (
    <div className={css.wrapperHomePage}>
      <header className={css.header}>
        <NavLink to="/" className={getNavLinkClassNames}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getNavLinkClassNames}>
          Movies
        </NavLink>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
