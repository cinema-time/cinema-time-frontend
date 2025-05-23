import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

const API_URL = "http://localhost:5005";

function EventEditPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [location, setlocation] = useState("");
	const [date, setdate] = useState("");
	const [createdBy, setCreatedBy] = useState(""); // Keep it, but consider not allowing edits here.
	const [participants, setParticipants] = useState(""); // For displaying names
	const [participantIds, setParticipantIds] = useState([]); // For submission // for backend
	const [imageFile, setImageFile] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
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
			})
			.catch((error) => console.log(error));
	}, [eventId]);

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
  
    // Only append new image if user selected one
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
  
      navigate(`/events/${eventId}`);
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

				{/* It's likely not needed or should not be editable */}
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
