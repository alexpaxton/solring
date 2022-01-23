import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  zIndex?: number
  portalId?: string
}

export const Portal: React.FC<PortalProps> = ({
  children,
  zIndex = 500,
  portalId = 'sol-portal',
}) => {
  const portal = getPortalElement(zIndex, portalId)
  return createPortal(children, portal)
}

function createPortalElement(zIndex: number, portalId: string): HTMLElement {
  const portalElement = document.createElement('div')
  portalElement.setAttribute('id', portalId)
  portalElement.setAttribute(
    'style',
    `position: fixed; z-index: ${zIndex}; top: 0; left: 0;`,
  )

  document.body.appendChild(portalElement)
  return portalElement
}

function getPortalElement(zIndex: number, portalId: string): HTMLElement {
  let portal = document.getElementById(portalId)
  if (!portal) {
    portal = createPortalElement(zIndex, portalId)
  }
  return portal
}
