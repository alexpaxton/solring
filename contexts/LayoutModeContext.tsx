import { createContext, FC, useContext, useState } from 'react'
import { LayoutMode } from 'types'

interface LayoutModeContextType {
  mode: LayoutMode
  setMode: (mode: LayoutMode) => void
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(
  undefined,
)

export const LayoutModeContextProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<LayoutMode>('type')

  return (
    <LayoutModeContext.Provider value={{ mode, setMode }}>
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
