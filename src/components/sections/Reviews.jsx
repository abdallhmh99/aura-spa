import { useState } from 'react'
import Card from '../ui/Card'
import './Reviews.css'

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jennings',
    role: 'Skincare Enthusiast',
    rating: 5,
    text: 'The HydraFacial here is absolutely game-changing. My skin has never felt this hydrated and glowing! The unique atmosphere and professional care are exceptional.',
    initials: 'SJ',
    avatarBg: 'var(--brand-softer)',
    likes: 12,
  },
  {
    id: 2,
    name: 'Emily Ross',
    role: 'Regular Client',
    rating: 5,
    text: 'Absolutely loved my organic keratin treatment! The stylist was professional, and the results have lasted for months. The online booking system is also super smooth.',
    initials: 'ER',
    avatarBg: 'var(--success-soft)',
    likes: 8,
  },
  {
    id: 3,
    name: 'Jessica Miller',
    role: 'Verified Booking',
    rating: 4.9,
    text: 'The Swedish massage was precisely what I needed after a stressful work week. Professional team, pristine facility, and deeply restorative environment.',
    initials: 'JM',
    avatarBg: 'var(--warning-soft)',
    likes: 15,
  }
]

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [likedReviews, setLikedReviews] = useState({})

  const handleLike = (id) => {
    const isLiked = likedReviews[id]
    setReviews(prev =>
      prev.map(rev =>
        rev.id === id
          ? { ...rev, likes: isLiked ? rev.likes - 1 : rev.likes + 1 }
          : rev
      )
    )
    setLikedReviews(prev => ({
      ...prev,
      [id]: !isLiked
    }))
  }

  return (
    <section id="reviews" className="reviews">
      <div className="reviews__container">
        <div className="reviews__header">
          <span className="reviews__subtitle">Client Stories</span>
          <h2 className="reviews__title">Loved by Our Clients</h2>
          <p className="reviews__description">
            Read real reviews from women who have experienced the premium care and relaxation at Aura Spa.
          </p>
        </div>

        <div className="reviews__grid">
          {reviews.map(review => {
            const isLiked = !!likedReviews[review.id]
            return (
              <Card key={review.id} className="review-card" variant="interactive">
                <div className="review-card__header">
                  <div className="review-card__user">
                    <div className="review-card__avatar" style={{ backgroundColor: review.avatarBg }}>
                      {review.initials}
                    </div>
                    <div className="review-card__user-info">
                      <h4 className="review-card__user-name">{review.name}</h4>
                      <span className="review-card__user-role">{review.role}</span>
                    </div>
                  </div>
                  <div className="review-card__rating">
                    <svg className="review-card__star" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="review-card__rating-value">{review.rating}</span>
                  </div>
                </div>

                <p className="review-card__text">"{review.text}"</p>

                <div className="review-card__footer">
                  <button
                    className={`review-card__like-btn ${isLiked ? 'review-card__like-btn--active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation() // Prevent card click triggers
                      handleLike(review.id)
                    }}
                    aria-label="Like review"
                  >
                    <svg className="review-card__heart" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="review-card__like-count">{review.likes}</span>
                  </button>
                  <span className="review-card__tag">Verified Review</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
