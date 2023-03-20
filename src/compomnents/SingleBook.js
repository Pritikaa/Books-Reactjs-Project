import { Link } from "react-router-dom";

const SingleBook = (props) => {
  return (
    <article key={props.id} className="menu-item">
      <img src={props.img} alt={props.title} className="photo" />
      <div className="item-info">
        <header>
          <h4>{props.title}</h4>
          <h4 className="price">{props.price} $</h4>
        </header>
        <p
          className={`item-desc-text ${
            props.desc.length > 600 ? "scroll" : ""
          }`}
        >
          {props.desc}
        </p>
        <Link className="btn" to={`/books/${props.id}`}>
          View Fullscreen
        </Link>
      </div>
    </article>
  );

  // return (
  //     <article key={book.id} className="menu-item">
  //         <img src={book.img} alt={book.title} className="photo" />
  //         <div className="item-info">
  //           <header>
  //             <h4>{book.title}</h4>
  //             <h4 className="price">{book.price} $</h4>
  //           </header>
  //           <p className="item-text">{book.desc}</p>
  //         </div>
  //       </article>
  // );

  // return (
  //     <main>
  //         <div className="title">
  //           <h2>{params.title}</h2>
  //           <div className='underline'></div>
  //         </div>
  //     </main>
  // );
};

export default SingleBook;
