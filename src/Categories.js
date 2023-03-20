import React, { useEffect, useState } from "react";

const Categories = (props) => {
  const [currentCat, setCurrentCat] = useState("all");

  const allCategories = [
    "all",
    ...new Set(props.books.map((item) => item.category)),
  ];

  useEffect(() => {
    props.fetchBooks();
  }, []);

  useEffect(() => {
    props.filterItems("all");
  }, []);

  return (
    <div>
      <div className="title">
        <h2>Our Books</h2>
        <div className="underline"></div>
      </div>

      <div className="btn-container">
        {allCategories.map((category, index) => {
          return (
            <button
              type="button"
              className={`filter-btn ${
                category === currentCat ? "active" : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentCat(category);
                props.passUp(category);
              }}
            >
              Show {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
