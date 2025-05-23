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
import EventListPage from "./pages/EventListPage";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import HomePage from "./pages/Homepage";
import UserProfilePage from "./pages/UserProfilePage"
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';



function App() {
  return (
    <>
    <MantineProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/users/my-profile" element={<UserProfilePage />} />
        <Route path="/films/:filmId" element={<FilmDetailsPage />} />
        <Route path="/filmlist" element={<FilmListPage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/create" element={<EventCreatePage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/events/edit/:eventId" element={<EventEditPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      </MantineProvider>
    </>
  );
}

export default App;
