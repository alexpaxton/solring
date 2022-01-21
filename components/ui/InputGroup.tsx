import * as colors from 'components/ui/colors'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { StandardProps } from 'types'

interface InputGroupProps extends StandardProps {
  label?: string
  children: ReactNode
}

export const InputGroup: FC<InputGroupProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <Group {...props}>
      {label && <Label>{label}</Label>}
      {children}
    </Group>
  )
}

const Group = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  background-color: ${colors.n2};
  color: ${colors.n4};
  border-radius: 4px;

  > input,
  > select {
    border-radius: 0;
  }

  > input {
    flex: 1 0 0;
  }

  & > input:first-child,
  & > select:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  & > input:last-child,
  & > select:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  & > input + input,
  & > input + select,
  & > select + select,
  & > select + input {
    margin-left: -2px;
  }
`

const Label = styled.div`
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  padding: 0 11px;
`
