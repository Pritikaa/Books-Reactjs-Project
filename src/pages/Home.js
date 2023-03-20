const Home = () => {
  return (
    <div>
      <div className="title">
        <h2>Home Page</h2>
        <div className="underline"></div>
      </div>
      <div className="home-background">
        <img
          src="https://i.pinimg.com/564x/7b/49/eb/7b49eb7784de678820eca19956892ca4.jpg"
          alt="library"
        ></img>
        <div className="home-text">
          <h2>Welcome</h2>
          <h3> to view books site</h3>
          <hr></hr>
          <p>
            There are many books here to browse through. Books of different
            genre are available to pique your interest. You can even add any
            book if you don't find it listed here.
          </p>
          <p> Why to wait just go and check!</p>
        </div>
      </div>
      <section></section>
    </div>
  );
};

export default Home;
