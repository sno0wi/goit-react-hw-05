import css from "./Layout.module.css";
import Navigation from "../Navigation/Navigation.jsx";

const Layout = ({ children }) => {
  return (
    <div className={css.wrapperHomePage}>
      <header className={css.header}>
        <Navigation />
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
