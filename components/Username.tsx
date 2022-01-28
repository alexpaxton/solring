import { colors } from 'components/ui'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  children: string
}

export const Username: FC<Props> = ({ children }) => (
  <Link href={`/user/${children}`}>
    <UsernameLink>@{children}</UsernameLink>
  </Link>
)

const UsernameLink = styled.span`
  font-size: inherit;
  font-weight: bold;
  color: ${colors.p2};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${colors.p3};
    text-decoration: underline;
  }
`
