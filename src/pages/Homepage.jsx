import axios from "axios";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const API_URL = "http://localhost:5005";

function HomePage() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/film`)
      .then((response) => {
        setFilm(response.data);
      })
      .catch((e) => console.log("Error getting films from the API...", e));
  }, []);

  return (
    <div className="carousel-container">
      <h1>Welcome to Cinema Time</h1>
      <h2>NOW SHOWING</h2>
      {film.length > 0 && (
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
          {film.map((filmObj) => (
            <div key={filmObj.id} className="card">
              <img src={filmObj.image} alt={filmObj.title} />
              <div className="card-content">
                <h3>{filmObj.title}</h3>
                <p>{filmObj.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default HomePage;
