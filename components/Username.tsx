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
  color: rgb(114, 101, 255);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(152, 147, 250);
    text-decoration: underline;
  }
`
