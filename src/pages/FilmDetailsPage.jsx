import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function FilmDetailsPage() {
	const [film, setFilm] = useState(null);
	const [loading, setLoading] = useState(true);
	const { filmId } = useParams();

	useEffect(() => {
        const getFilm = () => {
            console.log("Fetching film with ID:", filmId);
            axios
                .get(`${API_URL}/api/film/${filmId}`)
                .then((response) => {
                    console.log("API response:", response.data);
                    setFilm(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("API fetch error:", error);
                    setLoading(false);
                });
        };
        getFilm();
    }, [filmId]);

	if (loading) return <div>Loading...</div>;
    if(!film) return <div>No film found...</div>

	return (
        <>
          <div className="container">
            <h1>FILMS</h1>
            {film && (
              <div
                className="panel"
                key={film._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "300px",
                  borderRadius: "8px",
                }}
              >
                <p><strong>{film.title}</strong></p>
                {film.img && (
                  <img
                    src={film.img}
                    alt={film.title}
                    width="270px"
                    height="200px"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                )}
                <p>{film.description}</p>
                <p><strong>Genre:</strong> {film.genre } <strong>Year: </strong> {film.year}</p>
              </div>
            )}
          </div>
        </>
      );
        }

        export default FilmDetailsPage