import React, { FC, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { StandardProps } from 'types'
import { rgba } from 'utils'
import * as colors from './colors'
import { Portal } from './Portal'

interface ModalProps extends StandardProps {
  children: React.ReactNode
  isVisible: boolean
  onMaskClick?: () => void
}

const MODAL_TRANSITION_MS = 200

export const Modal: FC<ModalProps> = ({
  isVisible,
  onMaskClick,
  children,
  className = '',
  style,
}) => {
  return (
    <Portal>
      <Transition
        mountOnEnter={true}
        unmountOnExit={true}
        in={isVisible}
        timeout={MODAL_TRANSITION_MS}
      >
        {(state) => (
          <Mask
            className={`${state} ${className}`}
            style={style}
            onClick={onMaskClick}
          >
            <Content>{children}</Content>
          </Mask>
        )}
      </Transition>
    </Portal>
  )
}

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${rgba(colors.p0, 0.666)};
  overflow-x: hidden;
  overflow-y: auto;
  padding: 36px;
  transition: opacity ${MODAL_TRANSITION_MS}ms linear;
  opacity: 0;

  // Ensures bottom padding within a flex container
  &:after {
    content: '';
    height: 36px;
    width: 100%;
  }

  &.entered {
    opacity: 1;
  }

  &.exiting,
  &.exited {
    opacity: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: 0;
`

const Content = styled.div`
  transform: translateY(28px);
  transition: transform ${MODAL_TRANSITION_MS}ms ease;

  .entered & {
    transform: translateY(0);
  }

  .exiting &,
  .exited & {
    transform: translateY(28px);
  }
`

export function useModalState(initialState = false) {
  const [modalState, setModalState] = useState<boolean>(initialState)

  function openModal() {
    setModalState(true)
  }

  function closeModal() {
    setModalState(false)
  }

  function toggleModal() {
    setModalState(!modalState)
  }

  return {
    modalState,
    openModal,
    closeModal,
    toggleModal,
  }
}
