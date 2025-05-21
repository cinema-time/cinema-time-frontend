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
			axios
				.get(`${API_URL}/api/film/${filmId}`)
				.then((response) => {
					const oneFilm = response.data;
					setFilm(oneFilm);
					setLoading(false);
				})
				.catch((error) => console.log(error));
		};
		getFilm();
	}, [filmId]);

	if (loading) return <div>Loading...</div>;

	return (
		<>
			<div className="container">
                <h1>FILMS</h1>
                {film.map((post) => (
                    <div
                    className="card"
                    key={post.id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      width: "300px",
                      borderRadius: "8px",
                    }}>
                    <p>
                   
                      <strong>{post.title}</strong> 
                    </p>
                    <img
                      src={post.img}
                      alt={post.title}
                      width="270px"
                      height="200px"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                    <p>{post.description}</p>
                    </div>
                  ))}
                </div>
              </>
            );
        }

        export default FilmDetailsPage