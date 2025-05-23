import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Text, Button, Image } from "@mantine/core";

const API_URL = "http://localhost:5005";

function FilmListPage() {
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
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>All Films</h1>
      <Grid gutter="md">
        {film.map((filmObj) => (
          <Grid.Col key={filmObj._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Link to={`/films/${filmObj._id}`} style={{ textDecoration: "none" }}>
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
                <Text size="sm" c="dimmed">{filmObj.year}</Text>
                <Text size="sm" c="dimmed">{filmObj.genre}</Text>
                <Text size="sm" c="dimmed">{filmObj.director}</Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>

    </div>
  );
}

export default FilmListPage;