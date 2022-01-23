import React, { FC } from 'react'
import styled from 'styled-components'
import { StandardProps } from 'types'
import * as colors from './colors'

interface DialogProps extends StandardProps {
  width?: number
  children: React.ReactNode
  title: string
  onDismiss?: () => void
}

export const Dialog: FC<DialogProps> = ({
  width = 600,
  title,
  children,
  onDismiss,
  style,
}) => {
  return (
    <DialogBox style={{ width: `${width}px`, ...style }}>
      <DialogHeader>
        <h3>{title}</h3>
        {onDismiss && <DismissButton type="button" onClick={onDismiss} />}
      </DialogHeader>
      {children}
    </DialogBox>
  )
}

const DialogBox = styled.article`
  border-radius: 6px;
  background-color: ${colors.n1};
  box-shadow: 0 0 3px ${colors.p1}, 0 0 16px ${colors.p0};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  main {
    padding: 0 32px 32px 32px;
    display: flex;
  }

  footer {
    padding: 0 32px 32px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > * {
      margin-left: 12px;
    }
  }
`

const DialogHeader = styled.header`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 18px;
    line-height: 1em;
    font-weight: 400;
    color: ${colors.n6};
  }
`

const DismissButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    border-radius: 1px;
    background-color: ${colors.n3};
    transition: background-color 0.25s ease;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    cursor: pointer;
  }

  &:hover::after,
  &:hover::before {
    background-color: ${colors.r2};
  }
`
