import { CSSProperties } from 'react'
import { Card, CardIdentifier } from 'scryfall-sdk'

export function pluralizer(
  string: string,
  count: number,
  includeCount?: boolean,
): string {
  const title = includeCount ? `${count} ${string}` : string
  return count === 1 ? title : `${title}s`
}

export function scryfallToData(cards: Card[]): string[] {
  return cards.map((card) => card.id)
}

export function classnames(
  base: string | undefined,
  names: Record<string, boolean>,
) {
  const list = base ? [base] : []
  const optionalNames = Object.entries(names)
  optionalNames.forEach(([key, included]) => included && list.push(key))
  return list.join(' ')
}

export function linearGradient(
  angle: number,
  startColor: string,
  stopColor: string,
): string {
  return `linear-gradient(${angle}deg, ${startColor}, ${stopColor})`
}

/** Converts hexcodes to RGBA format. Alpha should be a decimal between 0-1 */
export function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hex2rgb(hex)
  return `rgba(${r},${g},${b}, ${alpha})`
}

const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/

type RGBAColor = [number, number, number, number]

export function hex2rgb(hexcode: string): RGBAColor {
  let hex = hexcode
  if (hex.match(RE_HEX)) {
    // remove optional leading #
    if (hex.length === 4 || hex.length === 7) {
      hex = hex.substring(1)
    }
    // expand short-notation to full six-digit
    if (hex.length === 3) {
      const chars = hex.split('')
      hex = chars[0] + chars[0] + chars[1] + chars[1] + chars[2] + chars[2]
    }
    const u = parseInt(hex, 16)
    const r = u >> 16
    const g = (u >> 8) & 0xff
    const b = u & 0xff
    return [r, g, b, 1]
  }

  // match rgba hex format, eg #FF000077
  if (hex.match(RE_HEXA)) {
    // remove optional leading #
    if (hex.length === 5 || hex.length === 9) {
      hex = hex.substring(1)
    }
    // expand short-notation to full eight-digit
    if (hex.length === 4) {
      const chars = hex.split('')
      hex =
        chars[0] +
        chars[0] +
        chars[1] +
        chars[1] +
        chars[2] +
        chars[2] +
        chars[3] +
        chars[3]
    }
    const u = parseInt(hex, 16)
    const r = (u >> 24) & 0xff
    const g = (u >> 16) & 0xff
    const b = (u >> 8) & 0xff
    const a = Math.round(((u & 0xff) / 0xff) * 100) / 100
    return [r, g, b, a]
  }

  throw new Error(`Unable to parse hex color: ${hex}`)
}

export function dedupe<T>(arr: T[]): T[] {
  const set = new Set(arr)
  return Array.from(set)
}

export function getCardsFromResults(
  results: Card[] & { not_found: CardIdentifier[] },
): Card[] {
  return results.map((c) => c)
}

/** Converts the string returned from getAttribute('style') into an object */
export function parseCSS(css: string): CSSProperties {
  const _css = `{"${css
    .replace(/\s/g, '')
    .replace(/;/g, '", "')
    .replace(/:/g, '": "')}"}`
  const obj = JSON.parse(_css)
  const keyValues = Object.keys(obj).map((key) => {
    const camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase())
    return { [camelCased]: obj[key] }
  })

  const style = Object.assign({}, ...keyValues) as CSSProperties
  return style
}

/** Converts a style object into a string ready for setAttribute('style') */
export function compileCSS(css: CSSProperties): string {
  const styles = Object.entries(css)
  const result: string[] = []
  styles.forEach(([k, v]) => result.push(`${k}: ${v}`))
  return result.join('; ')
}

export function capitalize(string: string): string {
  if (string === '') {
    return string
  }
  const chars = string.split('')
  chars[0] = chars[0].toUpperCase()
  return chars.join('')
}
