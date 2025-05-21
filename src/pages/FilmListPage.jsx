import axios from "axios";
import { useEffect, useState } from "react";

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
    <div>
      {film.map((filmObj) => {
        return (
          <div key={filmObj._id}>
            <h1>{filmObj.title}</h1>
            <p>{filmObj.genre}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FilmListPage;
