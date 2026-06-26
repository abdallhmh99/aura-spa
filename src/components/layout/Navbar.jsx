import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import './Navbar.css'

export default function Navbar({ onBookNow }) {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  const handleNavClick = (e, targetId) => {
    if (isDashboard) return
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-dot"></span>
          Aura Spa
        </Link>

        {!isDashboard && (
          <nav className="navbar__nav">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="navbar__link">Home</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="navbar__link">Services</a>
            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="navbar__link">Reviews</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="navbar__link">Contact</a>
          </nav>
        )}

        <div className="navbar__actions">
          {isDashboard ? (
            <Link to="/">
              <Button variant="secondary" size="sm">Back to Site</Button>
            </Link>
          ) : (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button variant="primary" size="sm" onClick={onBookNow}>Book Now</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
