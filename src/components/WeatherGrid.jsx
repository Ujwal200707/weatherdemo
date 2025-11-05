import WeatherCard from './WeatherCard'
import './WeatherGrid.css'

function WeatherGrid({ cards, onRemoveCard, onClearAll }) {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <div className="empty-icon">🌤️</div>
          <h3>No weather cards yet</h3>
          <p>Use the form above to add your first weather card. Enter the city and weather details to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-grid-container">
      <div className="grid-header">
        <h2>Your Weather Cards ({cards.length})</h2>
        <button className="clear-all-button" onClick={onClearAll}>
          Clear All
        </button>
      </div>
      <div className="weather-grid">
        {cards.map(card => (
          <WeatherCard
            key={card.id}
            card={card}
            onRemove={onRemoveCard}
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherGrid
