import { getSettingWithDefault } from '@screenly/edge-apps'

const STYLES = ['traditional', 'modern', 'minimal'] as const

export type ClockStyle = (typeof STYLES)[number]

export const DEFAULT_STYLE: ClockStyle = 'traditional'

/**
 * Normalise a style setting, falling back to the default for anything the app
 * does not recognise. Settings are free text at the API level, so an instance
 * can hold a value this build has never heard of.
 */
export function resolveStyle(value: string | undefined | null): ClockStyle {
  const normalised = value?.trim().toLowerCase()
  const match = STYLES.find((style) => style === normalised)

  return match ?? DEFAULT_STYLE
}

export function getClockStyle(): ClockStyle {
  return resolveStyle(getSettingWithDefault<string>('style', DEFAULT_STYLE))
}
