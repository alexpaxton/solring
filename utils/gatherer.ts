import {
  FiltersContextType,
  FiltersState,
  initialFiltersState,
} from 'contexts/FiltersContext'
import { CMCMode, ColorMode } from 'types'

export function extractFilters({
  cardName,
  cardType,
  ruleText,
  colors,
  colorMode,
  cmc,
  cmcAlt,
  cmcMode,
}: FiltersContextType): FiltersState {
  return {
    cardName,
    cardType,
    ruleText,
    colors,
    colorMode,
    cmc,
    cmcAlt,
    cmcMode,
  }
}

const allColors = ['w', 'u', 'b', 'r', 'g']

export function getScryfallQuery({
  cardName,
  ruleText,
  cmc,
  cmcAlt,
  cmcMode,
  cardType,
  colors,
  colorMode,
}: FiltersState): string {
  const query = ['-is:funny']

  cardName && cardName.length && query.push(`name:${cardName}`)

  if (cardType && cardType.length && cardType.includes(' ')) {
    const cardTypes = cardType.split(' ')
    cardTypes.forEach((type) => query.push(`type:${type}`))
  } else if (cardType.length) {
    query.push(`type:${cardType}`)
  }

  if (
    ruleText &&
    ruleText.length &&
    ruleText.startsWith('"') &&
    ruleText.endsWith('"')
  ) {
    query.push(`oracle:${ruleText}`)
  } else if (ruleText && ruleText.length && ruleText.includes(' ')) {
    const ruleTextWords = ruleText.split(' ')
    ruleTextWords.forEach((word) => query.push(`o:${word}`))
  } else if (ruleText && ruleText.length) {
    query.push(`o:${ruleText}`)
  }

  switch (cmcMode) {
    case 'exactly':
      query.push(`cmc:${cmc}`)
      break
    case 'atLeast':
      query.push(`cmc>=${cmc}`)
      break
    case 'atMost':
      query.push(`cmc<=${cmc}`)
      break
    case 'between':
      query.push(`cmc>=${cmc} cmc<=${cmcAlt}`)
      break
  }

  if (colors.length) {
    const colorsExcluded = allColors.filter((c) => !colors.includes(c))

    switch (colorMode) {
      case 'exactly':
        query.push(`c:${colors.join('')}`)
        colorsExcluded.forEach((color) => query.push(`-c:${color}`))
        break
      case 'exclude':
        colors.forEach((color) => query.push(`-c:${color}`))
        break
      case 'include':
        query.push(`c:${colors.join('')}`)
        break
    }
  }

  return query.join(' ')
}

export function getQueryString({
  cardName,
  ruleText,
  cmc,
  cmcAlt,
  cmcMode,
  cardType,
  colors,
  colorMode,
}: FiltersState): string {
  const params: string[] = []

  if (cardName) {
    params.push(`cardName=${encodeURIComponent(cardName)}`)
  }

  if (cardType) {
    params.push(`cardType=${encodeURIComponent(cardType)}`)
  }

  if (ruleText) {
    params.push(`ruleText=${encodeURIComponent(ruleText)}`)
  }

  if (colors && colors.length) {
    params.push(`colors=${encodeURIComponent(colors.join(''))}`)
  }

  if (colorMode) {
    params.push(`colorMode=${encodeURIComponent(colorMode)}`)
  }

  params.push(`cmc=${encodeURIComponent(cmc)}`)
  params.push(`cmcMode=${encodeURIComponent(cmcMode)}`)
  cmcMode === 'between' && params.push(`cmcAlt=${encodeURIComponent(cmcAlt)}`)

  return params.join('&')
}

export function parseQueryString(qs: string) {
  if (!qs) {
    return null
  }

  const filters = initialFiltersState
  const querystring = qs.slice(1)
  const params = querystring.split('&')

  params.forEach((p) => {
    const [k, v] = p.split('=')

    if (k === 'cardName' || k === 'ruleText' || k === 'cardType') {
      filters[k] = decodeURIComponent(v)
    }

    if (k === 'cmcMode') {
      filters[k] = decodeURIComponent(v) as CMCMode
    }

    if (k === 'cmc' || k === 'cmcAlt') {
      filters[k] = parseInt(decodeURIComponent(v))
    }

    if (k === 'colorMode') {
      filters[k] = decodeURIComponent(v) as ColorMode
    }

    if (k === 'colors') {
      filters[k] = decodeURIComponent(v).split('')
    }
  })

  return filters
}
