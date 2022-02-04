import { FC, MouseEvent as SyntheticMouseEvent, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { compileCSS, parseCSS } from 'utils'

interface Coords {
  x: number
  y: number
}

const PLANE_PADDING = 32

export const Plane: FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<boolean>(false)
  const dragStartCoords = useRef<Coords>({ x: 0, y: 0 })
  const transform = useRef<Coords>({ x: 0, y: 0 })

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag)

    return () => {
      window.removeEventListener('mousemove', handleDrag)
    }
  }, [])

  function handleDrag(e: MouseEvent) {
    if (!dragState.current || !containerRef.current || !planeRef.current) {
      return
    }

    const planeCSS = planeRef.current.getAttribute('style')
    if (!planeCSS) {
      throw new Error('planeRef has no style')
    }
    const planeStyle = parseCSS(planeCSS)
    const containerRect = containerRef.current.getBoundingClientRect()
    const planeRect = planeRef.current.getBoundingClientRect()

    const x =
      e.x - containerRect.left - dragStartCoords.current.x + transform.current.x
    const y =
      e.y - containerRect.top - dragStartCoords.current.y + transform.current.y

    const minX = containerRect.width - planeRect.width
    const maxX = 0

    const minY = containerRect.height - planeRect.height
    const maxY = 0

    const clampedX = Math.min(Math.max(minX, x), maxX)
    const clampedY = Math.min(Math.max(minY, y), maxY)

    const newPlaneStyle = {
      ...planeStyle,
      transform: `translate(${clampedX}px, ${clampedY}px)`,
    }

    const style = compileCSS(newPlaneStyle)
    planeRef.current.setAttribute('style', style)
  }

  function handleStartDrag(e: SyntheticMouseEvent<HTMLDivElement>) {
    if (!planeRef.current || !containerRef.current) {
      return
    }
    const planeStyle = planeRef.current.getAttribute('style')
    if (!planeStyle) {
      return
    }
    const planeCoords = extractCoordsFromStyle(planeStyle)
    const { top } = containerRef.current.getBoundingClientRect()
    dragState.current = true
    transform.current = { ...planeCoords, y: planeCoords.y + top }
    dragStartCoords.current = { x: e.pageX, y: e.pageY }
    window.addEventListener('mousemove', handleDrag)
    document.body.classList.add('dragging')
  }

  function handleStopDrag() {
    dragState.current = false
    window.removeEventListener('mousemove', handleDrag)
    document.body.classList.remove('dragging')
  }

  return (
    <Container
      onMouseDown={handleStartDrag}
      onMouseUp={handleStopDrag}
      ref={containerRef}
    >
      <Window
        ref={planeRef}
        style={{
          transform: 'translate(0px, 0px)',
          width: '800px',
          height: '2000px',
        }}
      >
        {children}
      </Window>
      <GlobalStyle />
    </Container>
  )
}

const GlobalStyle = createGlobalStyle`
  body.dragging * {
    cursor: grabbing !important;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ff0054;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: grab;
  }
`

const Window = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1600px;
  height: 2000px;
  padding: ${PLANE_PADDING}px;
  background-color: #226666;
  border: 10px solid #fff;
`

function extractCoordsFromStyle(css: string | null): Coords {
  if (!css) {
    throw new Error('extractCoordsFromStyle cannot parse "null"')
  }

  const style = parseCSS(css)
  const matches = `${style.transform}`
    .replace(/\s/g, '')
    .match(/[(]([-\d])+px,([-\d])+px[)]/g)

  if (!matches) {
    throw new Error('extractCoordsFromStyle cannot parse "undefined"')
  }
  const coords = matches[0].replace(/[px()]/g, '').split(',')
  if (coords.length !== 2) {
    throw new Error('String passed to extractCoordsFromStyle cannot be parsed')
  }

  return {
    x: parseInt(coords[0]),
    y: parseInt(coords[1]),
  }
}
