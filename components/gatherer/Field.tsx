import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  label: string
  className?: string
}

export const Field: FC<Props> = ({
  children, label, className
}) => {
  return (
    <Container className={className}>
      <div className="label">{label}</div>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-right: 8px;
  align-items: center;
  background-color: #eee;
  
  &:last-child {
    margin-right: 0;
  }

  > div.label {
    height: 32px;
    padding: 0 8px;
    font-size: 13px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
`