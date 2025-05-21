import { useState } from 'react'
import NavBar from './components/Navbar'  
import Footer from './components/Footer'
import SignupPage from './pages/SignupPage'

function App() {
  

  return (
    <>
<NavBar />

    <Routes>
    <Route path="/" element={<SignupPage />} />
    </Routes>

    <Footer />
    </>
  )
}

export default App
