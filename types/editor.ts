import { Card } from 'scryfall-sdk'

export interface Coords {
  x: number
  y: number
}

export interface LayoutPos {
  x: number
  y: number
  z: number
}

export interface LayoutHeading {
  text: string
  pos: LayoutPos
  count: number
}

export interface LayoutCard {
  card: Card
  pos: LayoutPos
}

export interface Layout {
  cards: LayoutCard[]
  headings: LayoutHeading[]
  board: {
    width: number
    height: number
  }
}

export type DeckSlice = Record<string, Card[]>

export type LayoutMode = 'type' | 'color' | 'cmc'
