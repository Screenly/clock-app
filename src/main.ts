import './css/style.css'

import {
  getMetadata,
  getTimeZone,
  getLocale,
  isLightColor,
  setupTheme,
  signalReady,
  getCityInfo,
} from '@screenly/edge-apps'
// Side-effect import: registers <auto-scaler> as a custom element
import '@screenly/edge-apps/components'
import { getWeatherData } from './weather'
import { getTimeData } from './time'
import { getClockStyle } from './style'

const WEATHER_REFRESH_MS = 15 * 60 * 1000

let locationEl: Element | null
let timeEl: Element | null
let periodEl: Element | null
let dateEl: Element | null
let temperatureEl: Element | null
let weatherIconEl: HTMLImageElement | null
let weatherEl: Element | null

let timezone: string = 'UTC'
let locale: string = 'en'

async function updateWeatherDisplay(
  latitude: number,
  longitude: number,
  tz: string,
  countryCode: string,
) {
  const weatherData = await getWeatherData(latitude, longitude, tz, countryCode)

  weatherEl?.classList.toggle('is-visible', Boolean(weatherData))
  if (!weatherData) return

  if (temperatureEl) {
    temperatureEl.textContent = weatherData.displayText
  }

  if (weatherIconEl) {
    weatherIconEl.src = weatherData.iconSrc
    weatherIconEl.alt = weatherData.iconAlt
  }
}

function updateTime() {
  const now = new Date()
  const data = getTimeData(now, locale, timezone)

  if (timeEl) {
    timeEl.textContent = `${data.hour}:${data.minute}`
  }

  if (periodEl) {
    periodEl.textContent = data.period
  }

  if (dateEl) {
    dateEl.textContent = data.date
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    locationEl = document.querySelector('[data-location]')
    timeEl = document.querySelector('[data-time]')
    periodEl = document.querySelector('[data-period]')
    dateEl = document.querySelector('[data-date]')
    temperatureEl = document.querySelector('[data-temperature]')
    weatherIconEl = document.querySelector<HTMLImageElement>(
      '[data-weather-icon]',
    )
    weatherEl = document.querySelector('[data-weather]')

    const { primary } = setupTheme()
    document.body.classList.toggle('is-light-brand', isLightColor(primary))
    document.body.classList.add(`style-${getClockStyle()}`)

    const metadata = getMetadata()
    const [latitude, longitude] = metadata.coordinates

    timezone = await getTimeZone()
    locale = await getLocale()

    const { cityName, countryCode } = await getCityInfo(latitude, longitude)
    if (locationEl) {
      locationEl.textContent = cityName
    }

    await updateWeatherDisplay(latitude, longitude, timezone, countryCode)

    updateTime()
    setInterval(updateTime, 1000)
    setInterval(() => {
      updateWeatherDisplay(latitude, longitude, timezone, countryCode).catch(
        (error) => console.error('Failed to refresh weather:', error),
      )
    }, WEATHER_REFRESH_MS)
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }

  signalReady()
})
