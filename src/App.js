//

import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useContext,
  Suspense,
} from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
import UserProfile from "./compomnents/Profile/UserProfile";

import "./App.css";

import Home from "./pages/Home";
import MainHeader from "./compomnents/MainHeader";

const AddBook = React.lazy(() => import("./pages/AddBook"));
const Categories = React.lazy(() => import("./Categories"));
const Menu = React.lazy(() => import("./pages/Menu"));
const BookDetail = React.lazy(() => import("./pages/BookDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [menuBookItems, setMenuBookItems] = useState(books);
  const history = useHistory();
  const allCategories = [
    "all",
    "Self-help",
    "Thriller",
    "Historical",
    "Fiction",
    "Mystery",
    "Horror",
    "Romance",
    "Historical",
    "Others",
  ];

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

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
    if (category) {
      filterItems(category);
    } else {
      filterItems("all");
    }
  };

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

    await response.json().then(() => {
      history.push("/books");
    });
  }

  let content = <p>No Books Found...</p>;

  if (books.length > 0) {
    content = (
      <Menu
        items={menuBookItems.length > 0 ? menuBookItems : books}
        fetchBooks={fetchBooksHandler}
        filterItems={filterItems}
        allCategories={allCategories}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main>
      <section className="menu section">
        <header className="App-header">
          <MainHeader fetchBooksHandler={fetchBooksHandler} />
        </header>
        <Suspense fallback={<p>Loading...!!!</p>}>
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
        </Suspense>
      </section>
    </main>
  );
}

export default App;
