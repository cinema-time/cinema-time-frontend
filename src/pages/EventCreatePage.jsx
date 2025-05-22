import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createEventSlug, convertSlugToName } from "../utils/index";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_EVENT_FORM_VALUES = {
  title: "",
  description: "",
  location: "",
  date: "2030-01-01",
  participants: "",
  createdBy: "",
};

function EventCreatePage() {
  const [event, setEvent] = useState({ ...DEFAULT_EVENT_FORM_VALUES });
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedEvent = {
      ...event,
      [name]: type === "checkbox" ? checked : value,
    };

    const eventSlug = createEventSlug(updatedEvent);
    const eventName = convertSlugToName(eventSlug);

    setEvent({
      ...updatedEvent,
      eventSlug,
      eventName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/api/events`, event)
      .then((response) => {
        const newEvent = response.data;
        navigate(`/events/details/${newEvent._id}`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="EventCreatePage panel transition-all duration-300 hover:shadow-xl hover:-translate-y-1 px-6 py-10 sm:px-10 sm:py-16 mb-12 mt-12 flex flex-col relative w-full max-w-3xl mx-auto">
      {" "}
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
          className="border rounded p-2 w-full mb-6"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={event.description}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-"
        />

        <label htmlFor="description">Where?</label>
        <input
          type="text"
          name="location"
          id="location"
          value={event.location}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-"
        />

        <label htmlFor="date">When?</label>
        <input
          type="date"
          name="date"
          id="date"
          value={event.date}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label htmlFor="participants">Who's in?</label>
        <select
          name="participants"
          id="participants"
          value={event.participants}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-600 text-gray-100 rounded-md p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 "
        >
          <option value="">-- Select Friend --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="font-mono tracking-wider uppercase border border-accent-color bg-transparent text-accent-color px-5 py-2 rounded-lg hover:bg-accent-color hover:text-bg-color transition-all"
        >
          Create event
        </button>
      </form>
    </div>
  );
}

export default EventCreatePage;
