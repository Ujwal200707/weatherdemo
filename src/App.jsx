import { useState, useEffect } from 'react'
import WeatherForm from './components/WeatherForm'
import WeatherGrid from './components/WeatherGrid'
import './App.css'

function App() {
  const [weatherCards, setWeatherCards] = useState([])

  // Load cards from localStorage on mount
  useEffect(() => {
    const savedCards = localStorage.getItem('weatherCards')
    if (savedCards) {
      setWeatherCards(JSON.parse(savedCards))
    }
  }, [])

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weatherCards', JSON.stringify(weatherCards))
  }, [weatherCards])

  const addWeatherCard = (cardData) => {
    const newCard = {
      id: Date.now(),
      ...cardData,
      lastUpdated: new Date().toISOString()
    }
    setWeatherCards(prev => [...prev, newCard])
  }

  const removeWeatherCard = (id) => {
    setWeatherCards(prev => prev.filter(card => card.id !== id))
  }

  const clearAllCards = () => {
    if (window.confirm('Are you sure you want to clear all weather cards?')) {
      setWeatherCards([])
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Cards</h1>
      </header>
      <main className="app-main">
        <WeatherForm onAddCard={addWeatherCard} />
        <WeatherGrid
          cards={weatherCards}
          onRemoveCard={removeWeatherCard}
          onClearAll={clearAllCards}
        />
      </main>
    </div>
  )
}

export default App
