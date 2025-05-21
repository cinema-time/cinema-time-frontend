import { useState } from 'react'
import NavBar from './components/Navbar'  
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import FilmListPage from './pages/FilmListPage'
import LoginPage from './pages/LoginPage'
import EventEditPage from './pages/EventEditPage'

function App() {
  

  return (
    <>
<NavBar />

    
<Routes>

  <Route path="/" element = {<LoginPage />}>
</Route>

<Route path="/filmlist" element = {<FilmListPage />}>
</Route>

<Route path="/editEvent" element = {<EventEditPage />}>
</Route>



</Routes>
    <Footer />
    </>
  )
}

export default App
