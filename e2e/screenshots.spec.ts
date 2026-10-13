import { test, type Browser } from '@playwright/test'
import {
  createMockScreenlyForScreenshots,
  getScreenshotsDir,
  RESOLUTIONS,
  setupClockMock,
  setupOpenWeatherMocks,
  setupScreenlyJsMock,
} from '@screenly/edge-apps/test/screenshots'
import {
  createGeocodingResponse,
  createWeatherResponse,
  NEW_YORK,
  type MockCity,
} from './weather-mocks'
import path from 'path'

interface ScreenshotVariant {
  city: MockCity
  timezone: string
  locale: string
  style: string
}

const DEFAULT_VARIANT: ScreenshotVariant = {
  city: NEW_YORK,
  timezone: 'America/New_York',
  locale: 'en',
  style: 'traditional',
}

// Extra app store screenshots, only rendered at 1080p landscape and portrait
const STORE_RESOLUTIONS = [
  { width: 1920, height: 1080 },
  { width: 1080, height: 1920 },
]

const STORE_VARIANTS: ScreenshotVariant[] = [
  {
    city: {
      name: 'Berlin',
      country: 'DE',
      coordinates: [52.52, 13.405],
      temperature: 8,
    },
    timezone: 'Europe/Berlin',
    locale: 'de',
    style: 'modern',
  },
  {
    city: {
      name: 'Paris',
      country: 'FR',
      coordinates: [48.8566, 2.3522],
      temperature: 11,
    },
    timezone: 'Europe/Paris',
    locale: 'fr',
    style: 'minimal',
  },
  {
    city: {
      name: 'Madrid',
      country: 'ES',
      coordinates: [40.4168, -3.7038],
      temperature: 15,
    },
    timezone: 'Europe/Madrid',
    locale: 'es',
    style: 'traditional',
  },
  {
    city: {
      name: 'Dubai',
      country: 'AE',
      coordinates: [25.2048, 55.2708],
      temperature: 28,
    },
    timezone: 'Asia/Dubai',
    locale: 'ar',
    style: 'traditional',
  },
]

async function takeScreenshot(
  browser: Browser,
  { width, height }: { width: number; height: number },
  variant: ScreenshotVariant,
  fileName: string,
) {
  const { screenlyJsContent } = createMockScreenlyForScreenshots(
    {
      coordinates: variant.city.coordinates,
      location: `${variant.city.name}, ${variant.city.country}`,
    },
    {
      override_timezone: variant.timezone,
      override_locale: variant.locale,
      style: variant.style,
      openweathermap_api_key: 'mock-api-key',
    },
  )

  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()

  await setupClockMock(page)
  await setupScreenlyJsMock(page, screenlyJsContent)
  await setupOpenWeatherMocks(page, {
    geocoding: createGeocodingResponse(variant.city),
    weather: createWeatherResponse(variant.city),
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await page.screenshot({
    path: path.join(getScreenshotsDir(), fileName),
    fullPage: false,
  })

  await context.close()
}

for (const resolution of RESOLUTIONS) {
  const { width, height } = resolution

  test(`screenshot ${width}x${height}`, async ({ browser }) => {
    await takeScreenshot(
      browser,
      resolution,
      DEFAULT_VARIANT,
      `${width}x${height}.png`,
    )
  })
}

for (const resolution of STORE_RESOLUTIONS) {
  const { width, height } = resolution

  for (const variant of STORE_VARIANTS) {
    const name = `${width}x${height}-${variant.locale}-${variant.style}`

    test(`screenshot ${name}`, async ({ browser }) => {
      await takeScreenshot(browser, resolution, variant, `${name}.png`)
    })
  }
}
