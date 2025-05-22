import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios;
    axios
      .get(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1><strong>{event.title}</strong> </h1>
      <img style={{ width: "300px", height: "auto" }} src={event.imageUrl} />
      <h3>{event.description}</h3>
      <p> <strong>Created by:</strong>  {event.createdBy.name}</p>
     <p><strong>Where?</strong> {event.location}</p>
	  <p>
       <strong>Who's attending:</strong>  
        {event.participants.map((participant, index) => (
          <span key={index}>
            {participant.name}
            {index < event.participants.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <Link to="/events">
        <button>Back to Events</button>
      </Link>

      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
}

export default EventDetailsPage;
