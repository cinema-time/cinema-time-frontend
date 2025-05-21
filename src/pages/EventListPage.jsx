import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EventListPage() {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/event`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((e) => console.log("Error getting events from the api...", e));
  }, []);

  return (
    <div className="event-card">
      {event.map((eventObj) => {
        return (
        <div key={eventObj._id}>
          <Link to={`/events/${eventObj._id}`} className="event-card">
            <h1>{eventObj.title}</h1>
            <p>{eventObj.genre}</p> 
          </Link>
          <Link to="/events/create">
            <button>Create New Event</button>
          </Link>
        </div>
        );
      })}
    </div>
  );
}

export default EventListPage;
