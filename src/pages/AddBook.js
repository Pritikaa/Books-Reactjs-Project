import React, { useState, useRef } from "react";
import { Route, Redirect, Link, Prompt } from "react-router-dom";

function AddBook(props) {
  const bookTitleRef = useRef("");
  const bookPriceRef = useRef("");
  const descriptionRef = useRef("");
  const bookCategoryRef = useRef("");
  const bookImageRef = useRef("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredCat, setEnteredCat] = useState("");
  const [bookTitleValid, setBookTitleValid] = useState(true);
  const [bookPriceValid, setBookPriceValid] = useState(true);
  const [bookDescValid, setBookDescValid] = useState(true);
  const [bookCatValid, setBookCatValid] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  function titleChangeHandler(event) {
    console.log(event.target);
    setEnteredTitle(event.target.value);
  }

  function priceChangeHandler(event) {
    setEnteredPrice(event.target.value);
  }

  function descChangeHandler(event) {
    setEnteredDesc(event.target.value);
  }

  function catChangeHandler(event) {
    setEnteredCat(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    if (enteredTitle.trim() === "") {
      setBookTitleValid(false);
      console.log(bookTitleRef);
      console.log("added");
      return;
    }

    if (enteredCat.trim() === "") {
      setBookCatValid(false);
      console.log("added");
      return;
    }

    if (enteredPrice.trim() === "") {
      setBookPriceValid(false);
      console.log("added");
      return;
    }

    if (enteredDesc.trim() === "") {
      setBookDescValid(false);
      console.log("added");
      return;
    }

    setBookTitleValid(true);
    setBookPriceValid(true);
    setBookDescValid(true);
    setBookCatValid(true);

    const book = {
      title: bookTitleRef.current.value,
      price: bookPriceRef.current.value,
      desc: descriptionRef.current.value,
      category: bookCategoryRef.current.value,
      img: bookImageRef.current.value,
    };

    props.onAddBook(book);
    console.log("added");
    props.filterItems("all");
  }

  function fetchBooksHandlerfunc() {
    setIsEntering(false);
    props.fetchBooks();
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  return (
    <div className="bookinput">
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data would be lost!"
        }
      />
      {/* <Prompt when={!isEntering} message={() => "You filled the form...!!"}/> */}
      <div className="title">
              <h2>Add Books</h2>
              <div className="underline"></div>
            </div>
      <div>
        <form onFocus={formFocusHandler} onSubmit={submitHandler}>
          <div className=" control">
            <label>Title</label>
            <input
              type="text"
              id="title"
              ref={bookTitleRef}
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
            {!bookTitleValid && (
              <p className="error-text">Title must not be empty</p>
            )}
          </div>
          <div className=" control">
            <label>Category</label>
            <input
              type="text"
              id="category"
              ref={bookCategoryRef}
              value={enteredCat}
              onChange={catChangeHandler}
            />
            {!bookCatValid && (
              <p className="error-text">Category must not be empty</p>
            )}
          </div>
          <div className=" control">
            <label>Price</label>
            <input
              type="text"
              id="book-price"
              ref={bookPriceRef}
              value={enteredPrice}
              onChange={priceChangeHandler}
            />
            {!bookPriceValid && (
              <p className="error-text">Price must not be empty</p>
            )}
          </div>
          <div className="control">
            <label>Upload Image</label>
            <input type="file" name="image" ref={bookImageRef} />
          </div>
          <div className=" control">
            <label>Description</label>
            <textarea
              rows="5"
              type="text"
              id="description"
              ref={descriptionRef}
              value={enteredDesc}
              onChange={descChangeHandler}
            ></textarea>
            {!bookDescValid && (
              <p className="error-text">Description must not be empty</p>
            )}
          </div>
          <button
            type="submit"
            className="addbook-button"
            onClick={fetchBooksHandlerfunc}
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
