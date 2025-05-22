import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function FilmListPage() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/film`)
      .then((response) => {
        setFilm(response.data);
      })
      .catch((e) => console.log("Error getting films from the api...", e));
  }, []);

  return (
    <div className="movie-card">
      {film.map((filmObj) => {
        return (
          <Link
            to={`/films/${filmObj._id}`}
            key={filmObj._id}
            className="movie-card"
          >
            <h1>{filmObj.title}</h1>
            <img
              style={{ width: "300px", height: "auto" }}
              src={filmObj.image}
            />
            <p>{filmObj.year}</p>
            <p>{filmObj.genre}</p>
            <p>{filmObj.director}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default FilmListPage;
