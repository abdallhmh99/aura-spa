import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Reviews from './components/sections/Reviews'
import Button from './components/ui/Button'
import './App.css'

function HomePage({ onBookNow }) {
  return (
    <>
      <Hero onBookNow={onBookNow} />
      <Services onBookNow={onBookNow} />
      <Reviews />
    </>
  )
}

function DashboardPage() {
  return (
    <div className="container" style={{ padding: '80px 24px', minHeight: '60vh' }}>
      <div style={{ padding: '40px', border: '2px solid var(--border-dark)', borderRadius: '4px', backgroundColor: 'var(--neutral-secondary)', boxShadow: 'var(--shadow-md)' }}>
        <h2 style={{ marginBottom: '16px' }}>Admin Dashboard (Coming Soon)</h2>
        <p>This space is dedicated to displaying appointments and weekly sales statistics for the salon.</p>
        <div style={{ marginTop: '24px' }}>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  const handleBookNow = () => {
    alert('Book Now clicked! (The booking system will be activated in Phase 3)')
  }

  return (
    <BrowserRouter>
      <Navbar onBookNow={handleBookNow} />
      <main className="page" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onBookNow={handleBookNow} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
