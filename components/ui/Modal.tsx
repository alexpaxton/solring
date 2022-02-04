import React, { FC, useLayoutEffect, useState } from 'react'
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
  onDismiss?: () => void
  onEscapeKey?: () => void
}

const MODAL_TRANSITION_MS = 200

export const Modal: FC<ModalProps> = ({
  isVisible,
  onMaskClick,
  onDismiss,
  onEscapeKey,
  children,
  className = '',
  style,
}) => {
  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onEscapeKey])

  function handleKeyDown(e: KeyboardEvent) {
    e.key === 'Escape' && onEscapeKey && onEscapeKey()
  }

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
            {onDismiss && <DismissButton onClick={onDismiss} />}
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
  background-color: ${rgba(colors.n0, 0.8)};
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

const DismissButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background-color: transparent;
  border: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
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
