import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createEventSlug, convertSlugToName } from "../utils/index";
import { MultiSelect } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_EVENT_FORM_VALUES = {
  title: "",
  description: "",
  location: "",
  date: "2025-01-01T12:00",
  participants: [],
  createdBy: "",
};

function EventCreatePage() {
  const [event, setEvent] = useState({ ...DEFAULT_EVENT_FORM_VALUES });
  const [users, setUsers] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedEvent = {
      ...event,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "title") {
      const eventSlug = createEventSlug(updatedEvent);
      const eventName = convertSlugToName(eventSlug);
      updatedEvent.eventSlug = eventSlug;
      updatedEvent.eventName = eventName;
    }

    setEvent(updatedEvent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!event.title || !event.date || !event.location) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("location", event.location);
    formData.append("participants", JSON.stringify(event.participants));
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await axios.post(`${API_URL}/api/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/events`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="EventCreatePage panel transition-all duration-300 hover:shadow-xl hover:-translate-y-1 px-6 py-10 sm:px-10 sm:py-16 mb-12 mt-12 flex flex-col relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Create event
        </h3>

        <label htmlFor="title">What's up?</label>
        <input
          type="text"
          name="title"
          id="title"
          value={event.title}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full mb-6"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={event.description}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6"
        />

        <label htmlFor="location">Where?</label>
        <input
          type="text"
          name="location"
          id="location"
          value={event.location}
          onChange={handleChange}
          required
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6"
        />

        <label htmlFor="date">When?</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          value={event.date}
          onChange={handleChange}
          required
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <label htmlFor="participants">Who's in?</label>
        <MultiSelect
          data={users.map((user) => ({
            value: user._id,
            label: user.name,
          }))}
          value={event.participants}
          onChange={(selected) =>
            setEvent((prev) => ({ ...prev, participants: selected }))
          }
          placeholder="Select participants"
          searchable
          clearable
          nothingFound="No users found"
          classNames={{
            input: "bg-gray-800 border border-gray-600 text-gray-100 p-3",
          }}
        />

        <label>Image</label>
        <Dropzone
          onDrop={(files) => setImageFile(files[0])}
          onReject={(files) => console.log("Rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
              <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono tracking-wider uppercase border border-accent-color bg-transparent text-accent-color px-5 py-2 rounded-lg hover:bg-accent-color hover:text-bg-color transition-all"
        >
          {isSubmitting ? "Creating..." : "Create event"}
        </button>
      </form>
    </div>
  );
}

export default EventCreatePage;