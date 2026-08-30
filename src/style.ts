import { getSettingWithDefault } from '@screenly/edge-apps'

export type ClockStyle = 'traditional' | 'modern' | 'minimal'

export const DEFAULT_STYLE: ClockStyle = 'traditional'

const STYLES: readonly string[] = ['traditional', 'modern', 'minimal']

/**
 * Normalise a style setting, falling back to the default for anything the app
 * does not recognise. Settings are free text at the API level, so an instance
 * can hold a value this build has never heard of.
 */
export function resolveStyle(value: string | undefined | null): ClockStyle {
  const normalised = value?.trim().toLowerCase()
  if (!normalised || !STYLES.includes(normalised)) return DEFAULT_STYLE

  return normalised as ClockStyle
}

export function getClockStyle(): ClockStyle {
  return resolveStyle(getSettingWithDefault<string>('style', DEFAULT_STYLE))
}
