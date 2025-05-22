import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EventEditPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // Keep it, but consider not allowing edits here.
  const [participants, setParticipants] = useState("");

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
       setParticipants(oneEvent.participants.map(part => part._id).join(", "));
       
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const requestBody = {
      title,
      description,
      imageUrl,
      location,
      date,
      participants: participants.split(",").map((name) => name.trim()), // Convert string back to array
    };

    axios
      .put(`${API_URL}/api/events/${eventId}`, requestBody,{
        headers: { Authorization: `Bearer ${token}` },
      } )
      .then(() => {
        navigate(`/events/${eventId}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteEvent = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
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

        <label>Image URL:</label>
        <input
          type="URL"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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

        {/* It's likely not needed or should not be editable */}
        <label>Created By:</label>
        <input
          type="text"
          name="createdBy"
          value={createdBy}
          readOnly
        />

        <label>Participants:</label>
        <input
          type="text"
          name="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />

        <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EventEditPage;