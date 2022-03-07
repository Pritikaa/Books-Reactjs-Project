import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useContext,
} from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import "./App.css";
import Categories from "./Categories";
import Menu from "./pages/Menu";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import MainHeader from "./compomnents/MainHeader";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import userProfile from "./compomnents/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
import UserProfile from "./compomnents/Profile/UserProfile";

function App() {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const history = useHistory();

  const fetchBooksHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://book-preview-baad1-default-rtdb.firebaseio.com/books.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong...");
      }

      const data = await response.json();

      const loadedBooks = [];
      for (const key in data) {
        loadedBooks.push({
          id: key,
          title: data[key].title,
          category: data[key].category,
          price: data[key].price,
          desc: data[key].desc,
          img: data[key].img,
        });
      }

      setBooks(loadedBooks);
      //console.log(books);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const allCategories = ["all", ...new Set(books.map((item) => item.category))];
  // console.log(allCategories);
  // const [categories, setCategories] = useState(allCategories);
  // console.log(categories);

  function fetchbookonclick() {
    fetchBooksHandler();
    //filterItems('all');
  }

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  const [menuBookItems, setMenuBookItems] = useState(books);
  const [firstReload, setFirstReload] = useState(false);

  const filterItems = (category) => {
    fetchBooksHandler();
    if (category === "all") {
      setMenuBookItems(books);
      return;
    }
    const categorisedItems = books.filter((item) => {
      return item.category === category;
    });
    setMenuBookItems(categorisedItems);
  };

  const passUpHandler = (category) => {
    fetchBooksHandler();
    filterItems("all");
    filterItems(category);
  };

  // useEffect(() => {
  //   fetchBooksHandler();
  //   setFirstReload(true);
  //   filterItems("all");
  //   //setFirstReload(false);
  // }, []);

  async function addBookHandler(book) {
    const response = await fetch(
      "https://book-preview-baad1-default-rtdb.firebaseio.com/books.json",
      {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    history.push("/books");
  }

  let content = <p>No Books Found...</p>;

  if (books.length > 0) {
    content = (
      <Menu
        items={menuBookItems}
        fetchBooks={fetchBooksHandler}
        filterItems={filterItems}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const fetchbooks = () => {
    if (authCtx.isLoggedIn) {
      fetchBooksHandler();
    }
  };
  
  return (
    <main>
      <section className="menu section">
        <header className="App-header">
          <MainHeader fetchBooksHandler={fetchBooksHandler} />
        </header>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          <Route path="/addbook">
            {authCtx.isLoggedIn && (
              <AddBook
                onAddBook={addBookHandler}
                fetchBooks={fetchBooksHandler}
                filterItems={filterItems}
              />
            )}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/profile">
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/books" exact>
            {authCtx.isLoggedIn && (
              <Fragment>
                {/* <button
                type="button"
                className="filter-btn fetch-book-btn"
                onClick={fetchbookonclick}
              >
                Fetch books
              </button> */}
                <Categories
                  books={books}
                  fetchBooks={fetchBooksHandler}
                  filterItems={filterItems}
                  passUp={passUpHandler}
                />
                {content}
              </Fragment>
            )}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/books/:bookId">
            {authCtx.isLoggedIn && <BookDetail books={books} />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </section>
    </main>
  );
}

export default App;
