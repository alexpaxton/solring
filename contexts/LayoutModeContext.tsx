import { createContext, FC, useContext, useState } from 'react'
import { LayoutDisplay, LayoutMode } from 'types'

interface LayoutModeContextType {
  mode: LayoutMode
  setMode: (mode: LayoutMode) => void
  display: LayoutDisplay
  setDisplay: (mode: LayoutDisplay) => void
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(
  undefined,
)

export const LayoutModeContextProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<LayoutMode>('type')
  const [display, setDisplay] = useState<LayoutDisplay>('grid')

  return (
    <LayoutModeContext.Provider value={{ mode, setMode, display, setDisplay }}>
      {children}
    </LayoutModeContext.Provider>
  )
}

export const useLayoutMode = (): LayoutModeContextType => {
  const context = useContext(LayoutModeContext)

  if (context === undefined) {
    throw new Error(
      'useLayoutMode must be called from a child component of LayoutModeContextProvider',
    )
  }

  return context
}
