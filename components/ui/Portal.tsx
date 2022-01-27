import { usePortal } from 'contexts'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const { portalRef } = usePortal()
  return portalRef.current ? createPortal(children, portalRef.current) : null
}
