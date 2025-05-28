import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Text, Image, Button, Badge, Group } from "@mantine/core";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  useEffect(() => {
    const message = localStorage.getItem("showToast");
    if (message) {
      toast.success(message);
      localStorage.removeItem("showToast");
    }
  }, []);

  if (!event)
    return (
      <div
        style={{
          backgroundColor: "#0f0f0f",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: "#1c1c1e",
          color: "#f1f1f1",
        }}
      >
        <Text size="xl" fw={700} mt="sm">
          {event.title}
        </Text>

        <Text mt="xs" c="dimmed" size="sm">
          {event.description}
        </Text>

        <Text mt="md">
          <strong>Created by:</strong> {event.createdBy?.name}
        </Text>

        <Text>
          <strong>Where?</strong> {event.location}
        </Text>

        {event.film && (
          <Text>
            <strong>Film:</strong> {event.film.title}
          </Text>
        )}

        <Text>
          <strong>Who's attending:</strong>
        </Text>

        <Group mt="xs" spacing="xs" wrap="wrap">
          {event.participants.map((participant, index) => (
            <Badge
              key={index}
              color="blue"
              variant="light"
              style={{ marginBottom: "5px" }}
            >
              {participant.name}
            </Badge>
          ))}
        </Group>

        <Group mt="lg" spacing="md">
          <Link to="/events">
            <Button variant="outline" color="gray">
              Back to Events
            </Button>
          </Link>
          <Link to={`/events/edit/${eventId}`}>
            <Button variant="filled" color="blue">
              Edit Event
            </Button>
          </Link>
        </Group>

        {event.imageUrl && (
          <Card.Section
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1.5rem",
            }}
          >
            <Image
              src={`${API_URL}${event.imageUrl}?t=${new Date().getTime()}`}
              height={120}
              width={180}
              fit="cover"
              radius="sm"
              alt={event.title}
            />
          </Card.Section>
        )}
      </Card>
    </div>
  );
}

export default EventDetailsPage;
