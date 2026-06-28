import { useState } from 'react'
import { categories, services } from '../../data/services'
import Card from '../ui/Card'
import Button from '../ui/Button'
import './Services.css'

export default function Services({ onBookNow }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.categoryId === activeCategory)

  return (
    <section id="services" className="services">
      <div className="services__container">
        <div className="services__header">
          <span className="services__subtitle">Our Offerings</span>
          <h2 className="services__title">Premium Wellness Services</h2>
          <p className="services__description">
            Experience our curated menu of beauty and relaxation therapies, custom-tailored for your unique needs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="services__tabs">
          <button
            className={`services__tab ${activeCategory === 'all' ? 'services__tab--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Services
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`services__tab ${activeCategory === cat.id ? 'services__tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services__grid">
          {filteredServices.map(service => (
            <Card key={service.id} className="service-card">
              <div className="service-card__header">
                <h3 className="service-card__name">{service.name}</h3>
                <span className="service-card__duration">{service.duration} mins</span>
              </div>
              <p className="service-card__description">{service.description}</p>
              <div className="service-card__footer">
                <div className="service-card__price-container">
                  <span className="service-card__price-label">Price</span>
                  <span className="service-card__price">{service.price} SAR</span>
                </div>
                <Button variant="primary" size="sm" onClick={onBookNow}>
                  Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
