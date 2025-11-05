import { useState, useEffect } from 'react'
import './WeatherCard.css'

function WeatherCard({ card, onRemove }) {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const updated = new Date(card.lastUpdated)
      const diffMs = now - updated
      const diffMins = Math.floor(diffMs / 60000)

      if (diffMins < 1) {
        setTimeAgo('just now')
      } else if (diffMins < 60) {
        setTimeAgo(`${diffMins} min ago`)
      } else {
        const diffHours = Math.floor(diffMins / 60)
        setTimeAgo(`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`)
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [card.lastUpdated])

  const getConditionIcon = (condition) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return '🌧️'
    } else if (lowerCondition.includes('snow')) {
      return '❄️'
    } else if (lowerCondition.includes('cloud')) {
      return '☁️'
    } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return '☀️'
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist') || lowerCondition.includes('haze')) {
      return '🌫️'
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return '⛈️'
    } else {
      return '☀️' // Default to sun
    }
  }

  return (
    <div className="weather-card">
      <button className="remove-button" onClick={() => onRemove(card.id)} aria-label="Remove card">
        ×
      </button>

      <div className="card-header">
        <h3 className="city-name">
          {card.city}
          {card.country && <span className="country-code">, {card.country}</span>}
        </h3>
        <div className="condition">
          <span className="condition-icon">{getConditionIcon(card.condition || '')}</span>
          <span className="condition-text">{card.condition || 'Unknown'}</span>
        </div>
      </div>

      <div className="temperature-section">
        <div className="main-temp">
          {card.temperature ? `${Math.round(card.temperature)}°${card.unit}` : 'N/A'}
        </div>
        {card.feelsLike && (
          <div className="feels-like">
            Feels like {Math.round(card.feelsLike)}°{card.unit}
          </div>
        )}
      </div>

      <div className="weather-details">
        {card.humidity && (
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{card.humidity}%</span>
          </div>
        )}
        {card.wind && (
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{parseFloat(card.wind).toFixed(1)} km/h</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="last-updated">Updated {timeAgo}</span>
      </div>
    </div>
  )
}

export default WeatherCard
