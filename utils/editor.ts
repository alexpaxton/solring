import { Card, Color } from 'scryfall-sdk'
import {
  CardId,
  DeckSlice,
  Layout,
  LayoutCard,
  LayoutHeading,
  LayoutMode,
} from 'types'

export function sliceDeck(mode: LayoutMode, cards: Card[]) {
  switch (mode) {
    case 'type':
      return sliceDeckByType(cards)
    case 'color':
      return sliceDeckByColor(cards)
    case 'cmc':
      return sliceDeckByCMC(cards)
    default:
      throw new Error(`${mode} is not a valid mode for slicing a deck`)
  }
}

export function getCardType(cardType: string): string {
  let type = cardType
    .replace('Legendary ', '')
    .replace(/([\w\s]+)\s—\s(.+)/g, '$1')

  if (type.includes('Land')) {
    type = 'Land'
  }
  return type
}

const humanFriendlyColors: Record<Color, string> = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
}

export function getCardColor(colors: Color[]): string {
  const results = colors.map((color) => humanFriendlyColors[color])
  return results.length ? results.join(' / ') : 'Colorless'
}

export function sliceDeckByCMC(cards: Card[]): DeckSlice {
  const deckByCMC: DeckSlice = {}
  cards.forEach((card) => {
    const cmc = card.cmc

    if (typeof deckByCMC[cmc] === 'undefined') {
      deckByCMC[cmc] = []
    }

    deckByCMC[cmc].push(card)
  })

  return deckByCMC
}

export function sliceDeckByType(cards: Card[]): DeckSlice {
  const deckByType: DeckSlice = {}
  cards.forEach((card) => {
    const type = getCardType(card.type_line)

    if (typeof deckByType[type] === 'undefined') {
      deckByType[type] = []
    }

    deckByType[type].push(card)
  })

  return deckByType
}

export function sliceDeckByColor(cards: Card[]): DeckSlice {
  const deckByColor: DeckSlice = {}
  cards.forEach((card) => {
    const color = getCardColor(card.color_identity || [])

    if (typeof deckByColor[color] === 'undefined') {
      deckByColor[color] = []
    }

    deckByColor[color].push(card)
  })

  return deckByColor
}

export const layoutProportions = {
  cardSize: {
    width: 180,
    height: 250,
  },
  columnGap: 24,
  cardGap: 34,
  headingHeight: 68,
  gutter: 30,
}

export function layoutCards(deck: DeckSlice): Layout {
  const cards: LayoutCard[] = []
  const headings: LayoutHeading[] = []
  const columns = Object.entries(deck)
  let largestColumn = 0
  const width = getLayoutWidth(columns.length)

  columns.forEach((column, columnIndex) => {
    const x =
      columnIndex *
      (layoutProportions.cardSize.width + layoutProportions.columnGap)
    const columnName = column[0]
    const columnCards = column[1]
    headings.push({
      text: columnName,
      pos: {
        x: x + layoutProportions.gutter,
        y: layoutProportions.gutter,
        z: 1,
      },
      count: columnCards.length,
    })

    if (columnCards.length > largestColumn) {
      largestColumn = columnCards.length
    }

    const uniques = countUniques(columnCards)

    uniques.forEach((card, cardIndex) => {
      const y =
        layoutProportions.headingHeight + cardIndex * layoutProportions.cardGap
      const z = cardIndex + 1

      cards.push({
        card,
        count: card.count,
        pos: {
          x: x + layoutProportions.gutter,
          y: y + layoutProportions.gutter,
          z,
        },
      })
    })
  })

  const height = getLayoutHeight(largestColumn)

  return { cards, headings, board: { width, height } }
}

function getLayoutWidth(columns: number): number {
  const columnsWidths = columns * layoutProportions.cardSize.width
  const gaps = columns - 1
  const gapsWidths = gaps * layoutProportions.columnGap
  const gutters = layoutProportions.gutter * 2

  return columnsWidths + gapsWidths + gutters
}

function getLayoutHeight(cardCount: number): number {
  const stackedCards = cardCount - 1
  const stackedCardsHeight = stackedCards * layoutProportions.cardGap
  const gutters = layoutProportions.gutter * 2

  return (
    stackedCardsHeight +
    layoutProportions.cardSize.height +
    layoutProportions.headingHeight +
    gutters
  )
}

export function parseBulkAddInput(input: string) {
  const entries = input.split('\n').filter((e) => e !== '')
  const cards: CardId[] = []
  entries.forEach((entry) => {
    const parsed = entry.replace(/([\dx])\s([\w\s',/]+)/g, '$1~$2').split('~')
    let qty = 1
    let name = parsed[0]
    if (parsed.length === 2) {
      qty = parseInt(parsed[0]) || 1
      name = parsed[1]
    }

    for (let i = 0; i < qty; i++) {
      cards.push({ name })
    }
  })

  return cards
}

/** Sort Function */
function byCardName(a: Card, b: Card) {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1
  }
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1
  }

  return 0
}

type CardStack = Record<string, Card[]>

interface CardWithCount extends Card {
  count: number
}

function countUniques(cards: Card[]): CardWithCount[] {
  const stacks: CardStack = {}

  cards.forEach((card) => {
    if (typeof stacks[card.name] !== 'object') {
      stacks[card.name] = []
    }

    stacks[card.name].push(card)
  })

  const uniques = Object.entries(stacks)

  const countedCards = uniques.map(([_, stack]) => {
    const count = stack.length
    const card = stack[0]

    return { ...card, count }
  })

  return countedCards.sort(byCardName)
}
