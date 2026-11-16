import { Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Trending from "./components/Trending"
import Reasons from './components/Reasons'
import FAQ from './components/FAQ'
import Membership from './components/Membership'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Browse from './pages/Browse'
import ProtectedRoute from './components/ProtectedRoute'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Trending />
      <Reasons />
      <FAQ />
      <Membership />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
  path="/browse"
  element={
    <ProtectedRoute>
      <Browse />
    </ProtectedRoute>
  }
/>
    </Routes>
  )
}

export default App