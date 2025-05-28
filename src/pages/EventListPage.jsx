import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Text, Button, Image } from "@mantine/core";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function EventListPage() {
  const [event, setEvent] = useState([]);
  const toastShown = useRef(false);
  const [originalEvents, setOriginalEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
        setOriginalEvents(response.data);
      })
      .catch((e) => console.log("Error getting events from the API...", e));
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("showToast");
    if (message && !toastShown.current) {
      toast.success(message);
      localStorage.removeItem("showToast");
      toastShown.current = true;
    }
  }, []);

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setEvent(originalEvents);
    } else {
      setEvent(
        event.filter(
          (event) =>
            event.title.toLowerCase().includes(value) ||
            event.description.toLowerCase().includes(value)
        )
      );
    }
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
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <div style={{ width: "300px" }}>
          <SearchBar onChange={onChange} />
        </div>
      </div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>All Events</h1>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Grid gutter="md">
          {event.map((eventObj) => (
            <Grid.Col
              key={eventObj._id}
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
            >
              <Link
                to={`/events/${eventObj._id}`}
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
                  {eventObj.imageUrl && (
                    <Card.Section style={{ height: "400px", overflow: "hidden" }}>
                      <Image
                        src={`${API_URL}${eventObj.imageUrl}`}
                        height="100%"
                        width="100%"
                        fit="cover"
                        radius="md"
                        alt={eventObj.title}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Card.Section>
                  )}
                  <Text size="lg" fw={600} mt="sm">
                    {eventObj.title}
                  </Text>
                  {eventObj.film && eventObj.film.title && (
                    <Text size="me" mt="xs" c="dimmed">
                      We will be watching:{" "}
                      <strong>{eventObj.film.title}</strong>
                    </Text>
                  )}
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default EventListPage;
