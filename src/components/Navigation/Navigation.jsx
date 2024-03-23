import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
    [css.inactive]: !isActive,
  });

const Navigation = () => {
  return (
    <>
      <NavLink to="/" className={getNavLinkClassNames}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getNavLinkClassNames}>
        Movies
      </NavLink>
    </>
  );
};

export default Navigation;
