import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useRef,
} from 'react'
import styled from 'styled-components'

interface PortalContextType {
  portalRef: RefObject<HTMLDivElement>
}

const PortalContext = createContext<PortalContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const PortalContextProvider: FC<Props> = ({ children }) => {
  const portalRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <Portal ref={portalRef} />
      <PortalContext.Provider value={{ portalRef }}>
        {children}
      </PortalContext.Provider>
    </>
  )
}

const Portal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
`

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext)

  if (!context) {
    throw new Error(
      'usePortal must be called from a component within PortalContextProvider',
    )
  }

  return context
}
