import { test } from '@playwright/test'
import {
  captureScreenshot,
  createMockScreenlyForScreenshots,
  RESOLUTIONS,
  setupOpenWeatherMocks,
} from '@screenly/edge-apps/test/screenshots'
import { mockGeocodingResponse, mockWeatherResponse } from './weather-mocks'

const { screenlyJsContent } = createMockScreenlyForScreenshots(
  {
    coordinates: [40.7128, -74.006],
    location: 'New York, NY',
  },
  {
    override_timezone: 'America/New_York',
    override_locale: 'en',
    openweathermap_api_key: 'mock-api-key',
  },
)

for (const { width, height } of RESOLUTIONS) {
  test(`screenshot ${width}x${height}`, async ({ browser }) => {
    await captureScreenshot(browser, {
      width,
      height,
      filenamePrefix: 'clock-app',
      screenlyJsContent,
      setupMocks: async (page) => {
        await setupOpenWeatherMocks(page, {
          geocoding: mockGeocodingResponse,
          weather: mockWeatherResponse,
        })
      },
    })
  })
}
