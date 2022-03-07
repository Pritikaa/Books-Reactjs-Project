import React, { useEffect, useState } from "react";

const Categories = (props) => {
  const [firstReload, setFirstReload] = useState(true);

  const allCategories = [
    "all",
    ...new Set(props.books.map((item) => item.category)),
  ];

  useEffect(() => {
    props.fetchBooks();
  }, []);

  //props.passUp(allCategories);
  //console.log(allCategories);
  //const [categories, setCategories] = useState(allCategories);
  //console.log(categories);

  // if (firstReload) {
  //     props.filterItems('all');
  //     setFirstReload(false);
  // }

  const passUpHandler = () => {
    //props.passUp(allCategories);
    // if(firstReload) {
    //     props.filterItems('all');
    // }
    // else {
    //     props.filterItems(category);
    // }
  };

  const callfilter = () => {
    if (firstReload) {
      props.filterItems("all");
    }
  };

  useEffect(() => {
    //setFirstReload(true);
    //props.filterItems("all");
    callfilter();
    //setFirstReload(false);
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
              className="filter-btn"
              key={index}
              onClick={() => props.passUp(category)}
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
