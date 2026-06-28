import Card from '../ui/Card'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <span className="contact__subtitle">Find Us</span>
          <h2 className="contact__title">Contact & Location</h2>
          <p className="contact__description">
            Have questions or want to book an appointment? Get in touch with us or visit our sanctuary.
          </p>
        </div>

        <div className="contact__grid">
          {/* Left Column: Info Cards */}
          <div className="contact__info">
            <Card className="contact__card">
              <h3 className="contact__card-title">Working Hours</h3>
              <div className="contact__hours">
                <div className="contact__row">
                  <span className="contact__days">Saturday – Thursday</span>
                  <span className="contact__time">9:00 AM – 8:00 PM</span>
                </div>
                <div className="contact__row contact__row--closed">
                  <span className="contact__days">Friday</span>
                  <span className="contact__time contact__time--highlight">Closed</span>
                </div>
              </div>
            </Card>

            <Card className="contact__card">
              <h3 className="contact__card-title">Get In Touch</h3>
              <div className="contact__details">
                <div className="contact__detail-item">
                  <span className="contact__icon" role="img" aria-label="Phone">📞</span>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">Phone</span>
                    <a href="tel:+966500000000" className="contact__detail-link">
                      +966 500 000 000
                    </a>
                  </div>
                </div>

                <div className="contact__detail-item">
                  <span className="contact__icon" role="img" aria-label="Email">✉️</span>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">Email</span>
                    <a href="mailto:info@auraspa.com" className="contact__detail-link">
                      info@auraspa.com
                    </a>
                  </div>
                </div>

                <div className="contact__detail-item">
                  <span className="contact__icon" role="img" aria-label="Location">📍</span>
                  <div className="contact__detail-content">
                    <span className="contact__detail-label">Address</span>
                    <span className="contact__detail-value">
                      Riyadh, Olaya District, Tahlia St.
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Riso-Style SVG Map */}
          <div className="contact__map-container">
            <div className="contact__map-pane">
              <svg
                className="contact__map-svg"
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background cream texture fill */}
                <rect width="500" height="400" fill="#FBF6EC" />

                {/* Grid Lines (15% opacity secondary blue #2C3FA7) */}
                <g stroke="#2C3FA7" strokeWidth="1" strokeDasharray="4 4" opacity="0.15">
                  <line x1="50" y1="0" x2="50" y2="400" />
                  <line x1="100" y1="0" x2="100" y2="400" />
                  <line x1="150" y1="0" x2="150" y2="400" />
                  <line x1="200" y1="0" x2="200" y2="400" />
                  <line x1="250" y1="0" x2="250" y2="400" />
                  <line x1="300" y1="0" x2="300" y2="400" />
                  <line x1="350" y1="0" x2="350" y2="400" />
                  <line x1="400" y1="0" x2="400" y2="400" />
                  <line x1="450" y1="0" x2="450" y2="400" />

                  <line x1="0" y1="50" x2="500" y2="50" />
                  <line x1="0" y1="100" x2="500" y2="100" />
                  <line x1="0" y1="150" x2="500" y2="150" />
                  <line x1="0" y1="200" x2="500" y2="200" />
                  <line x1="0" y1="250" x2="500" y2="250" />
                  <line x1="0" y1="300" x2="500" y2="300" />
                  <line x1="0" y1="350" x2="500" y2="350" />
                </g>

                {/* Street: Tahlia St (Horizontal) */}
                <rect x="0" y="220" width="500" height="40" fill="#EDE6D6" stroke="#2C3FA7" strokeWidth="2" />
                <text
                  x="20"
                  y="244"
                  fill="#2C3FA7"
                  fontFamily="Space Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                >
                  TAHLIA STREET
                </text>

                {/* Street: Olaya St (Vertical) */}
                <rect x="300" y="0" width="40" height="400" fill="#EDE6D6" stroke="#2C3FA7" strokeWidth="2" />
                <text
                  x="324"
                  y="20"
                  fill="#2C3FA7"
                  fontFamily="Space Mono, monospace"
                  fontSize="11"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                  transform="rotate(90 324 20)"
                >
                  OLAYA STREET
                </text>

                {/* Compass/Registration Mark (Top Right) */}
                <g transform="translate(440, 60)">
                  <circle cx="0" cy="0" r="16" stroke="#2C3FA7" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="0" cy="0" r="10" stroke="#2C3FA7" strokeWidth="1" />
                  <line x1="-20" y1="0" x2="20" y2="0" stroke="#2C3FA7" strokeWidth="1" />
                  <line x1="0" y1="-20" x2="0" y2="20" stroke="#2C3FA7" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill="#F237A1" />
                </g>

                {/* Halftone Dot Grid (Bottom Left) */}
                <g fill="#2C3FA7" opacity="0.25" transform="translate(40, 320)">
                  <circle cx="0" cy="0" r="3" />
                  <circle cx="15" cy="0" r="3" />
                  <circle cx="30" cy="0" r="3" />
                  <circle cx="45" cy="0" r="3" />
                  <circle cx="0" cy="15" r="3" />
                  <circle cx="15" cy="15" r="3" />
                  <circle cx="30" cy="15" r="3" />
                  <circle cx="45" cy="15" r="3" />
                  <circle cx="0" cy="30" r="3" />
                  <circle cx="15" cy="30" r="3" />
                  <circle cx="30" cy="30" r="3" />
                  <circle cx="45" cy="30" r="3" />
                </g>

                {/* Riso-style offset shadow under Location Pin */}
                <circle cx="324" cy="244" r="12" fill="#2C3FA7" />

                {/* Location Pin (Intersection) */}
                <circle cx="320" cy="240" r="12" fill="#F237A1" stroke="#2C3FA7" strokeWidth="2" />
                {/* White Star inside Pin */}
                <path
                  d="M320 235L321.5 239.5H326L322.3 242.2L323.8 246.7L320 244L316.2 246.7L317.7 242.2L314 239.5H318.5L320 235Z"
                  fill="white"
                />

                {/* Connecting indicator line to popup */}
                <line x1="320" y1="228" x2="320" y2="185" stroke="#2C3FA7" strokeWidth="2" strokeDasharray="3 3" />

                {/* Label Popup Box */}
                <g transform="translate(240, 130)">
                  {/* Offset Shadow */}
                  <rect x="4" y="4" width="160" height="50" rx="4" fill="#2C3FA7" />
                  {/* Foreground Card */}
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#FBF6EC" stroke="#2C3FA7" strokeWidth="2" />
                  <text
                    x="80"
                    y="22"
                    textAnchor="middle"
                    fill="#2C3FA7"
                    fontFamily="Space Grotesk, sans-serif"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    AURA SPA
                  </text>
                  <text
                    x="80"
                    y="38"
                    textAnchor="middle"
                    fill="#637EC2"
                    fontFamily="Space Mono, monospace"
                    fontSize="9"
                    letterSpacing="0.04em"
                  >
                    PREMIUM SANCTUARY
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
