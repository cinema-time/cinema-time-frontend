import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

function EventEditPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [participants, setParticipants] = useState("");
  const [participantIds, setParticipantIds] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [films, setFilms] = useState([]);
  const [selectedFilmId, setSelectedFilmId] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
        setImageUrl(oneEvent.imageUrl);
        setlocation(oneEvent.location);
        setdate(oneEvent.date);
        setCreatedBy(oneEvent.createdBy ? oneEvent.createdBy.name : "");
        setParticipants(oneEvent.participants.map((p) => p.name).join(", "));
        setParticipantIds(oneEvent.participants.map((p) => p._id));
        setSelectedFilmId(oneEvent.film?._id || "");
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/film`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setFilms(response.data))
      .catch(console.error);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("participants", JSON.stringify(participantIds));
    formData.append("film", selectedFilmId);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`${API_URL}/api/events/${eventId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      localStorage.setItem("showToast", "Event updated successfully!");
      navigate(`/events`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEvent = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.setItem("showToast", "Event deleted successfully!");
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />

        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />

        <label>Film:</label>
        <select
          value={selectedFilmId}
          onChange={(e) => setSelectedFilmId(e.target.value)}
        >
          <option value="">-- Select a Film --</option>
          {films.map((film) => (
            <option key={film._id} value={film._id}>
              {film.title}
            </option>
          ))}
        </select>

        <label>Created By:</label>
        <input type="text" name="createdBy" value={createdBy} readOnly />

        <label>Participants:</label>
        <input
          type="text"
          name="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />

        <label>Image</label>
        <Dropzone
          onDrop={(files) => {
            setImageFile(files[0]);
          }}
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
          maxSize={5 * 1024 ** 2}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                One file only, max 5 MB
              </Text>
            </div>
          </Group>
        </Dropzone>

        {imageFile && (
          <Text size="sm" mt="sm">
            Selected image: {imageFile.name}
          </Text>
        )}

        <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EventEditPage;
