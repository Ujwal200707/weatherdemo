import { useState } from 'react'
import './WeatherForm.css'

function WeatherForm({ onAddCard }) {
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    unit: 'C',
    temperature: '',
    feelsLike: '',
    condition: '',
    humidity: '',
    wind: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (formData.temperature && isNaN(formData.temperature)) {
      newErrors.temperature = 'Temperature must be a number'
    }

    if (formData.feelsLike && isNaN(formData.feelsLike)) {
      newErrors.feelsLike = 'Feels like must be a number'
    }

    if (formData.humidity && (isNaN(formData.humidity) || formData.humidity < 0 || formData.humidity > 100)) {
      newErrors.humidity = 'Humidity must be a number between 0 and 100'
    }

    if (formData.wind && isNaN(formData.wind)) {
      newErrors.wind = 'Wind speed must be a number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onAddCard(formData)
      // Reset form
      setFormData({
        city: '',
        country: '',
        unit: 'C',
        temperature: '',
        feelsLike: '',
        condition: '',
        humidity: '',
        wind: ''
      })
      setErrors({})
    }
  }

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="temperature">Temperature</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className={errors.temperature ? 'error' : ''}
          />
          {errors.temperature && <span className="error-message">{errors.temperature}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="feelsLike">Feels Like</label>
        <input
          type="number"
          id="feelsLike"
          name="feelsLike"
          value={formData.feelsLike}
          onChange={handleChange}
          className={errors.feelsLike ? 'error' : ''}
        />
        {errors.feelsLike && <span className="error-message">{errors.feelsLike}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="condition">Condition</label>
        <input
          type="text"
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="humidity">Humidity (%)</label>
          <input
            type="number"
            id="humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            min="0"
            max="100"
            className={errors.humidity ? 'error' : ''}
          />
          {errors.humidity && <span className="error-message">{errors.humidity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="wind">Wind (km/h)</label>
          <input
            type="number"
            id="wind"
            name="wind"
            value={formData.wind}
            onChange={handleChange}
            className={errors.wind ? 'error' : ''}
          />
          {errors.wind && <span className="error-message">{errors.wind}</span>}
        </div>
      </div>

      <button type="submit" className="add-button">Add Weather Card</button>
    </form>
  )
}

export default WeatherForm
