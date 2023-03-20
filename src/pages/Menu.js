import React from "react";
import SingleBook from "../compomnents/SingleBook";

const Menu = (props) => {
  return (
    <div className="section-center">
      {props.items.map((menuItem) => {
        const { id, title, img, price, desc } = menuItem;
        return (
          <SingleBook
            key={id}
            id={id}
            title={title}
            img={img}
            price={price}
            desc={desc}
          />
        );
      })}
    </div>
  );
};

export default Menu;
