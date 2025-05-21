import axios from "axios";
import { useEffect, useState } from "react";

function FilmDetailsPage() {
	const [film, setFilm] = useState(null);
	const [loading, setLoading] = useState(true);
	const { filmId } = useParams();

	useEffect(() => {
		axios
			.get(`${API_URL}/api/film`)
			.then((response) => {
				
			})
			.catch((e) => console.log("Error getting characters from the api...", e));
	}, []);

	return (
		<>
			<div></div>
		</>
	);
}
