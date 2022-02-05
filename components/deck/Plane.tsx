import { FC, MouseEvent as SyntheticMouseEvent, useEffect, useRef } from 'react'
import styled, { createGlobalStyle, CSSProperties } from 'styled-components'
import { Coords } from 'types'
import { compileCSS } from 'utils'

interface Props {
  width: number
  height: number
  children?: React.ReactNode
}

export const Plane: FC<Props> = ({ width, height, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<boolean>(false)
  const dragStartCoords = useRef<Coords>({ x: 0, y: 0 })
  const transform = useRef<Coords>({ x: 0, y: 0 })
  const planeStyle = useRef<CSSProperties>({
    width: `${width}px`,
    height: `${height}px`,
    transform: 'translate(0px, 0px)',
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag)

    return () => {
      window.removeEventListener('mousemove', handleDrag)
    }
  }, [])

  useEffect(() => {
    updatePlaneDimensions(width, height)
  }, [width, height])

  function updatePlaneDimensions(width: number, height: number) {
    const updatedStyle = {
      ...planeStyle.current,
      width: `${width}px`,
      height: `${height}px`,
    }
    planeStyle.current = updatedStyle
    const style = compileCSS(updatedStyle)
    planeRef.current?.setAttribute('style', style)
  }

  function handleDrag(e: MouseEvent) {
    if (!dragState.current || !containerRef.current || !planeRef.current) {
      return
    }

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
      ...planeStyle.current,
      transform: `translate(${clampedX}px, ${clampedY}px)`,
    }

    const style = compileCSS(newPlaneStyle)
    planeRef.current.setAttribute('style', style)
    planeStyle.current = newPlaneStyle
  }

  function handleStartDrag(e: SyntheticMouseEvent<HTMLDivElement>) {
    if (!planeRef.current || !containerRef.current) {
      return
    }
    const planeCoords = extractCoordsFromStyle(planeStyle.current)
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
      <Window ref={planeRef} style={planeStyle.current}>
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
  flex: 1 0 0;
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
  padding: 32px;
`

function extractCoordsFromStyle(css: CSSProperties): Coords {
  const matches = `${css.transform}`
    .replace(/\s/g, '')
    .match(/[(]([-\d])+px,([-\d])+px[)]/g)

  if (!matches) {
    throw new Error('extractCoordsFromStyle cannot parse "undefined"')
  }
  const coords = matches[0].replace(/[px()]/g, '').split(',')
  if (coords.length !== 2) {
    throw new Error(
      `Argument passed to extractCoordsFromStyle cannot be parsed: ${css.transform}`,
    )
  }

  return {
    x: parseInt(coords[0]),
    y: parseInt(coords[1]),
  }
}
