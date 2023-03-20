import { useParams } from "react-router-dom";

const BookDetail = (props) => {
  const params = useParams();
  const book = props.books.find((book) => book.id === params.bookId);

  if (!book) {
    return <p>No Such Book Found !</p>;
  }

  return (
    <div>
      <div className="title">
        <h2>Book Details</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        <article key={book.id} className="menu-item">
          <img src={book.img} alt={book.title} className="photo" />
          <div className="item-info-detail">
            <header>
              <h4>Book Id: {book.id}</h4>
            </header>
            <p className="item-text">
              <b>Title:</b> {book.title}
            </p>
            <p className="item-text">
              <b>Price: </b>
              {book.price}
            </p>
            <p className="item-text">
              <b>Category: </b>
              {book.category}
            </p>
            <p className="item-text">
              <b>Description: </b> {book.desc}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BookDetail;
