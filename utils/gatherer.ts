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
  queryText,
  active,
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
    queryText,
    active,
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
  queryText,
  active,
}: FiltersState): string {
  const query = [queryText, '-is:funny']

  addCardName(cardName, query, active.cardName)
  addCardType(cardType, query, active.cardType)
  addCMC(cmc, cmcAlt, cmcMode, query, active.cmc)
  addRuleText(ruleText, query, active.ruleText)
  addColors(colors, colorMode, query, active.colors)

  return query.join(' ')
}

function addCardName(cardName: string, query: string[], active: boolean) {
  if (!active || !cardName) {
    return
  }

  query.push(`name:${cardName}`)
}

function addCardType(cardType: string, query: string[], active: boolean) {
  if (!active || !cardType) {
    return
  }

  if (cardType.includes(' ')) {
    const types = cardType.split(' ')
    types.forEach((type) => query.push(`type:${type}`))
    return
  }

  query.push(`type:${cardType}`)
}

function addCMC(
  cmc: number,
  cmcAlt: number,
  cmcMode: CMCMode,
  query: string[],
  active: boolean,
) {
  if (!active) {
    return
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
}

function addColors(
  colors: string[],
  colorMode: ColorMode,
  query: string[],
  active: boolean,
) {
  if (!active || !colors.length) {
    return
  }

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

function addRuleText(ruleText: string, query: string[], active: boolean) {
  if (!active || !ruleText) {
    return
  }

  if (ruleText.startsWith('"') && ruleText.endsWith('')) {
    query.push(`o:${ruleText}`)
    return
  }

  if (ruleText.includes(' ')) {
    const texts = ruleText.split(' ')
    texts.forEach((text) => query.push(`o:${text}`))
    return
  }

  query.push(`o:${ruleText}`)
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
  queryText,
  active,
}: FiltersState): string {
  const params: string[] = []

  if (queryText) {
    params.push(`queryText=${encodeURIComponent(queryText)}`)
  }

  if (active.cardName && cardName.length) {
    params.push(`cardName=${encodeURIComponent(cardName)}`)
  }

  if (active.cardType && cardType.length) {
    params.push(`cardType=${encodeURIComponent(cardType)}`)
  }

  if (active.ruleText && ruleText.length) {
    params.push(`ruleText=${encodeURIComponent(ruleText)}`)
  }

  if (active.colors && colors.length) {
    params.push(`colors=${encodeURIComponent(colors.join(''))}`)
    params.push(`colorMode=${encodeURIComponent(colorMode)}`)
  }

  if (active.cmc) {
    params.push(`cmc=${encodeURIComponent(cmc)}`)
    params.push(`cmcMode=${encodeURIComponent(cmcMode)}`)
    cmcMode === 'between' && params.push(`cmcAlt=${encodeURIComponent(cmcAlt)}`)
  }

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
      filters.active[k] = true
    }

    if (k === 'cmcMode') {
      filters[k] = decodeURIComponent(v) as CMCMode
      filters.active.cmc = true
    }

    if (k === 'cmc' || k === 'cmcAlt') {
      filters[k] = parseInt(decodeURIComponent(v))
    }

    if (k === 'colorMode') {
      filters[k] = decodeURIComponent(v) as ColorMode
    }

    if (k === 'colors') {
      filters[k] = decodeURIComponent(v).split('')
      filters.active.colors = true
    }

    if (k === 'queryText') {
      filters[k] = decodeURIComponent(v)
    }
  })

  return filters
}
