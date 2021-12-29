import {FC} from 'react'
import styled from 'styled-components'
import {useMe} from 'utils'

interface Props {
    creatorId: string
}

export const EditDeckButton: FC<Props> = ({creatorId}) => {
  const {id} = useMe()

  if (creatorId === id) {
    return <Button>Edit Deck</Button>
  }

  return null
}

const Button = styled.button`
    width: 100px;
    height: 40px;
`
