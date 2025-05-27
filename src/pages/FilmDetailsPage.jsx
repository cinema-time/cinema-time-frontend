import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!film) return <div className="text-center mt-10 error-text">No film found...</div>;

  return (
    <div className="page-container">
      <div className="profile-card w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {film.image && (
          <img
            src={film.image}
            alt={film.title}
            className="w-full md:w-[500px] h-auto rounded-md object-contain border border-[var(--border-color)]"
          />
        )}

        <div className="flex-1">
          <h1 className="text-5xl mb-4">{film.title}</h1>

          <div className="text-sm text-[var(--secondary-text)] mb-4">
            <span className="mr-4"><strong>Genre:</strong> {film.genre}</span>
            <span className="mr-4"><strong>Year:</strong> {film.year}</span>
            <span><strong>Director:</strong> {film.director}</span>
          </div>

          {film.iMDB && (
            <p className="mb-4 text-sm">
              <a
                href={film.iMDB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-color)] hover:text-[var(--highlight)] underline"
              >
                View on IMDb
              </a>
            </p>
          )}

          <p className="text-[var(--text-color)] leading-relaxed">{film.description}</p>

          <div className="mt-6">
            <Link
              to="/filmlist"
              className="text-[var(--accent-color)] hover:text-[var(--highlight)] text-sm underline"
            >
              &larr; Back to Films
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetailsPage;
