import { useState } from "react";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import LoginPage from "./pages/LoginPage";
import FilmListPage from "./pages/FilmListPage";
import About from "./pages/About";
import SignupPage from "./pages/SignupPage";
import EventEditPage from "./pages/EventEditPage";
import "./App.css";
import EventCreatePage from "./pages/EventCreatePage";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
	return (
		<>
			<NavBar />

			<Routes>
				<Route path="/" element={<SignupPage />} />
				<Route path="/" element={<LoginPage />} />
				<Route path="/films/:filmId" element={<FilmDetailsPage />} />
				<Route path="/filmlist" element={<FilmListPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/editEvent" element={<EventEditPage />} /> 
				<Route path="/event/details/:eventId" element={<EventDetailsPage />} /> 
        <Route path="/createevent" element={<EventCreatePage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
