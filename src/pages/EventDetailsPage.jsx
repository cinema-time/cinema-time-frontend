import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  
  useEffect(() => {
    axios.get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.log(error));
  }, [eventId]); 

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <img style={{ width: '300px', height: 'auto' }}  src = {event.imageUrl} />
      <p>{event.description}</p>
      <p>Created by :{event.createdBy.name}</p>
      <p>Who's attending?:{event.participants.name}</p>
      
      
      <Link to="/events">
        <button>Back to Events</button>
      </Link>
      
      
      <Link to={`/event/details/${eventId}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
}

export default EventDetailsPage;