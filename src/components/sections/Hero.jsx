import Button from '../ui/Button'
import './Hero.css'

function RisoIllustration() {
  return (
    <svg className="hero__illustration" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="250" cy="250" r="180" fill="#FDE3F0" />
      <circle cx="260" cy="240" r="180" fill="none" stroke="#2C3FA7" strokeWidth="2" strokeDasharray="8 6" />

      <rect x="160" y="140" width="160" height="200" rx="4" fill="#FBF6EC" stroke="#2C3FA7" strokeWidth="2" />
      <rect x="168" y="148" width="160" height="200" rx="4" fill="#F237A1" opacity="0.15" />

      <circle cx="240" cy="210" r="40" fill="#F237A1" />
      <circle cx="248" cy="218" r="40" fill="none" stroke="#2C3FA7" strokeWidth="2" />

      <rect x="190" y="280" width="80" height="12" rx="4" fill="#2C3FA7" />
      <rect x="200" y="300" width="60" height="8" rx="4" fill="#2C3FA7" opacity="0.4" />

      <g opacity="0.3">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={350 + col * 14}
              cy={100 + row * 14}
              r="2.5"
              fill="#2C3FA7"
            />
          ))
        )}
      </g>

      <g opacity="0.25">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`pdot-${row}-${col}`}
              cx={80 + col * 16}
              cy={320 + row * 16}
              r="3"
              fill="#F237A1"
            />
          ))
        )}
      </g>

      <path d="M370 280 L420 340 L320 340 Z" fill="#F237A1" opacity="0.25" />
      <path d="M378 288 L428 348 L328 348 Z" fill="none" stroke="#2C3FA7" strokeWidth="2" />

      <rect x="80" y="140" width="40" height="40" rx="4" fill="#2C3FA7" opacity="0.12" />
      <rect x="84" y="144" width="40" height="40" rx="4" fill="none" stroke="#F237A1" strokeWidth="1.5" />

      <line x1="60" y1="460" x2="440" y2="460" stroke="#2C3FA7" strokeWidth="1" opacity="0.2" />
      <circle cx="60" cy="460" r="4" fill="#F237A1" />
      <circle cx="440" cy="460" r="4" fill="#2C3FA7" />

      <line x1="420" y1="80" x2="420" y2="130" stroke="#2C3FA7" strokeWidth="1.5" opacity="0.3" />
      <line x1="395" y1="105" x2="445" y2="105" stroke="#2C3FA7" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

export default function Hero({ onBookNow }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Luxury Salon & Spa
          </div>
          <h1 className="hero__title">
            Discover Your Natural Beauty with
            <span className="hero__title-accent"> Aura Spa</span>
          </h1>
          <p className="hero__description">
            Your luxury sanctuary for care and relaxation. We offer the finest skincare, therapeutic massage, and professional hair styling by top experts.
          </p>
          <div className="hero__actions">
            <Button variant="primary" size="lg" onClick={onBookNow}>
              Book Your Appointment
            </Button>
            <a href="#services" className="hero__link">
              Explore Our Services &rarr;
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">+2,500</span>
              <span className="hero__stat-label">Happy Clients</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">+8</span>
              <span className="hero__stat-label">Years of Experience</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">4.9</span>
              <span className="hero__stat-label">Customer Reviews</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <RisoIllustration />
        </div>
      </div>
    </section>
  )
}
