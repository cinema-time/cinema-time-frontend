import { useState } from 'react'
import NavBar from './components/Navbar'  
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import FilmDetailsPage from './pages/FilmDetailsPage'
import LoginPage from './pages/LoginPage'
import FilmListPage from './pages/FilmListPage'
import About from './pages/About'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  

  return (
    <>
<NavBar />

    <Routes>
    <Route path="/" element={<SignupPage />} />
    <Route path="/" element={<LoginPage />} />
    <Route path="/films/details/:filmId" element={<FilmDetailsPage/>} />
    <Route path="/filmlist" element={<FilmListPage />} />
    <Route path="/about" element={<About />} />

    </Routes>

    <Footer />
    </>
  )
}

export default App
