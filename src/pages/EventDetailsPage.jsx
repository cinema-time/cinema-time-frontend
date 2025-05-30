import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Text,
  Image,
  Button,
  Badge,
  Group,
  Divider,
  Grid,
  Stack,
} from "@mantine/core";
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
        alignItems: "center",
      }}
    >
      <Card
        shadow="xl"
        padding="xl"
        radius="lg"
        withBorder
        style={{
          width: "90%",
          maxWidth: "1200px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
        }}
      >
        <Grid gutter="xl">
          {event.imageUrl && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src={`${API_URL}${event.imageUrl}?t=${new Date().getTime()}`}
                height={400}
                fit="cover"
                radius="md"
                alt={event.title}
              />
            </Grid.Col>
          )}

          <Grid.Col span={{ base: 12, md: event.imageUrl ? 6 : 12 }}>
            <Stack spacing="md">
              <Text size = {36} fw={700} style={{ lineHeight: 1.2, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                {event.title}
              </Text>
              <Text size="xl" c="dimmed">
                {event.description}
              </Text>

              <Divider my="sm" />

              <Text size="md">
                <strong>Created by:</strong> {event.createdBy?.name}
              </Text>
              <Text size="md">
                <strong>Where:</strong> {event.location}
              </Text>
              <Text size="md">
                <strong>When:</strong> {event.date}
              </Text>
              {event.film && (
                <Text size="md">
                  <strong>Film:</strong> {event.film.title}
                </Text>
              )}

              <Text mt="md" size="md" fw={500}>
                Who's attending:
              </Text>
              <Group spacing="xs" mt={4} wrap="wrap">
                {event.participants.map((participant, index) => (
                  <Badge key={index} color="blue" variant="light">
                    {participant.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Group mt="xl" spacing="md" position="right">
          <Link to="/events">
            <Button variant="outline" color="gray" size="md">
              Back
            </Button>
          </Link>
          <Link to={`/events/edit/${eventId}`}>
            <Button variant="filled" color="blue" size="md">
              Edit
            </Button>
          </Link>
        </Group>
      </Card>
    </div>
  );
}

export default EventDetailsPage;
