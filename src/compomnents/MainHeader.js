import { NavLink, Link } from "react-router-dom";
import { useState, useContext } from "react";
import classes from "./MainHeader.module.css";
import AuthContext from "../store/auth-context";

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  if(authCtx.isLoggedIn) {
      console.log("hello");
  }
  const logoutHandler = () => {
    authCtx.logout();
  };

  const [handler, setHandler] = useState(false);

  const showBookHandler = () => {
    props.fetchBooksHandler();
    setHandler(true);
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Home Page
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink
                activeClassName={classes.active}
                to="/books"
                onClick={showBookHandler}
              >
                Show Books
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/addbook">
                Add Book
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
