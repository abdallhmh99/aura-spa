import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-dot"></span>
              Aura Spa
            </div>
            <p className="footer__description">
              Your premium sanctuary for beauty and relaxation. We offer the finest skincare, massage, and hair styling services by the most skilled experts.
            </p>
          </div>

          <div className="footer__info">
            <h4 className="footer__title">Working Hours</h4>
            <ul className="footer__list">
              <li className="footer__item">Sat – Thu: 9:00 AM – 8:00 PM</li>
              <li className="footer__item">Friday: Closed</li>
            </ul>
          </div>

          <div className="footer__info">
            <h4 className="footer__title">Contact Us</h4>
            <ul className="footer__list">
              <li className="footer__item">Phone: +966 500 000 000</li>
              <li className="footer__item">Email: info@auraspa.com</li>
              <li className="footer__item">Address: Riyadh, Olaya District, Tahlia St.</li>
            </ul>
          </div>

          <div className="footer__info">
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__list">
              <li>
                <Link to="/dashboard" className="footer__link">Admin Dashboard</Link>
              </li>
              <li>
                <a href="#services" className="footer__link">Our Services</a>
              </li>
              <li>
                <a href="#reviews" className="footer__link">Client Reviews</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Aura Spa. All rights reserved.
          </p>
          <div className="footer__riso-marks">
            <span className="footer__mark footer__mark--pink"></span>
            <span className="footer__mark footer__mark--blue"></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
