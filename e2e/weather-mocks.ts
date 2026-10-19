/**
 * Mock OpenWeather API responses for screenshot testing
 */

export interface MockCity {
  name: string
  country: string
  coordinates: [number, number]
  /** Temperature in the unit the app will request for this country */
  temperature: number
}

export const NEW_YORK: MockCity = {
  name: 'New York',
  country: 'US',
  coordinates: [40.7128, -74.006],
  temperature: 72.5,
}

/**
 * Mock OpenWeather API response for reverse geocoding
 */
export function createGeocodingResponse(city: MockCity) {
  const [lat, lon] = city.coordinates

  return [
    {
      name: city.name,
      lat,
      lon,
      country: city.country,
    },
  ]
}

/**
 * Mock OpenWeather API response for current weather (clear sky)
 */
export function createWeatherResponse(city: MockCity) {
  const [lat, lon] = city.coordinates
  const { temperature } = city

  return {
    coord: { lon, lat },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: temperature,
      feels_like: temperature - 1.3,
      temp_min: temperature - 4.5,
      temp_max: temperature + 2.5,
      pressure: 1013,
      humidity: 65,
      sea_level: 1013,
      grnd_level: 1010,
    },
    visibility: 10000,
    wind: {
      speed: 8.5,
      deg: 180,
    },
    clouds: {
      all: 0,
    },
    dt: 1740000000,
    sys: {
      type: 2,
      id: 2000000,
      country: city.country,
      sunrise: 1739970000,
      sunset: 1740010000,
    },
    timezone: -18000,
    id: 5128581,
    name: city.name,
    cod: 200,
  }
}

export const mockGeocodingResponse = createGeocodingResponse(NEW_YORK)
export const mockWeatherResponse = createWeatherResponse(NEW_YORK)
