import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

function FilmDetailsPage() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { filmId } = useParams();

  // Handle rating change with backend update
  const handleRatingChange = (value) => {
    // Optimistic UI update:
    setFilm((prev) => ({ ...prev, rating: value * 2 }));

    // Persist rating to backend
    axios
      .put(`${API_URL}/api/film/${filmId}`, { rating: value * 2 })
      .then((response) => {
        setFilm(response.data); // update with confirmed data from backend
      })
      .catch((error) => {
        console.error("Failed to update rating", error);
        // Optionally, revert optimistic update on error
        setFilm((prev) => ({ ...prev, rating: prev.rating }));
      });
  };

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

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!film)
    return <div className="text-center mt-10 error-text">No film found...</div>;

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
            <span className="mr-4">
              <strong>Genre:</strong> {film.genre}
            </span>
            <span className="mr-4">
              <strong>Year:</strong> {film.year}
            </span>
            <span>
              <strong>Director:</strong> {film.director}
            </span>
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
          <p className="text-[var(--text-color)] leading-relaxed">
            {film.description}
          </p>
          {/* RATING SECTION */}
          <div className="mb-4">
            <p className="mb-1 text-sm">
              <strong>Your Rating:</strong>
            </p>
            <Rating
              value={film.rating ? film.rating / 2 : 0} // Convert 10 scale to 5 stars
              onChange={handleRatingChange}
              fractions={2}
              color="violet"
              size="lg"
            />
            <p className="text-xs mt-1 text-[var(--secondary-text)]">
              {film.rating}/10
            </p>
          </div>
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