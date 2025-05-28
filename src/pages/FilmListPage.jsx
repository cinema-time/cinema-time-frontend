import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Text, Image, Rating } from "@mantine/core";
import SearchBar from "../components/SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function FilmListPage() {
  const [film, setFilm] = useState([]);
  const [filteredFilm, setFilteredFilm] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/film`)
      .then((response) => {
        setFilm(response.data);
        setFilteredFilm(response.data);
      })
      .catch((e) => console.log("Error getting films from the API...", e));
  }, []);

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilm(filteredFilm);
    } else {
      setFilm(
        filteredFilm.filter(
          (film) =>
            film.title.toLowerCase().includes(value) ||
            film.description.toLowerCase().includes(value) ||
            film.genre.toLowerCase().includes(value) ||
            film.director.toLowerCase().includes(value) ||
            film.year.toString().includes(value)
        )
      );
    }
  };

  const sortFilms = (option) => {
    let sortedFilms = [...film];
  
    if (option === "genre") {
      sortedFilms.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (option === "year") {
      sortedFilms.sort((a, b) => b.year - a.year); 
    } else if (option === "alphabetical") {
      sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "rating") {
      sortedFilms.sort((a, b) => b.rating - a.rating); 
    } else {
      sortedFilms = [...filteredFilm]; 
    }
  
    setFilm(sortedFilms);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ width: "300px" }}>
          <SearchBar onChange={onChange} />
        </div>
        <select
          value={sortOption}
          onChange={(e) => {
            const selectedOption = e.target.value;
            setSortOption(selectedOption);
            sortFilms(selectedOption);
          }}
          style={{
            width: "180px",
            height: "20px",
            padding: "0.5rem",
            backgroundColor: "#1c1c1e",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "5px",
          }}
        >
          <option value="">Sort By</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
          <option value="genre">Genre</option>
          <option value="year">Year (Newest First)</option>
          <option value="rating">Rating (Highest First)</option>
        </select>
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>All Films</h1>
      <Grid gutter="md">
        {film.map((filmObj) => (
          <Grid.Col key={filmObj._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Link
              to={`/films/${filmObj._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  backgroundColor: "#1c1c1e",
                  color: "#f1f1f1",
                  height: "100%",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
              >
                {filmObj.image && (
                  <Card.Section>
                    <Image
                      src={filmObj.image}
                      height={160}
                      width="100%"
                      fit="cover"
                      radius="sm"
                      alt={filmObj.title}
                    />
                  </Card.Section>
                )}
                <Text size="lg" fw={600} mt="sm">
                  {filmObj.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {filmObj.year}
                </Text>
                <Text size="sm" c="dimmed">
                  {filmObj.genre}
                </Text>
                <Text size="sm" c="dimmed">
                  {filmObj.director}
                </Text>
                {filmObj.rating >= 7 && (
                  <Text size="sm" fw={700} style={{ color: "red" }}>
                    Recommended
                  </Text>
                )}
                <Rating
                  value={filmObj.rating ? filmObj.rating / 2 : 0}
                  readOnly
                  fractions={2}
                  color="violet"
                />
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default FilmListPage;