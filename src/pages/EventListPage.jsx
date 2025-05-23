import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, Text, Button, Image } from "@mantine/core";

const API_URL = "http://localhost:5005";

function EventListPage() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
      })
      .catch((e) => console.log("Error getting events from the API...", e));
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
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>All Events</h1>
      <Grid gutter="md">
        {event.map((eventObj) => (
          <Grid.Col key={eventObj._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Link to={`/events/${eventObj._id}`} style={{ textDecoration: "none" }}>
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
                  <Card.Section>
                    <Image
                      src={eventObj.imageUrl}
                      height={160}
                      width="100%"
                      fit="cover"
                      radius="sm"
                      alt={eventObj.title}
                     
                    />
                  </Card.Section>
                )}
                <Text size="lg" fw={600} mt="sm">
                  {eventObj.title}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/events/create">
          <Button variant="filled" color="blue">
            Create New Event
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EventListPage;